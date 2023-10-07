"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mentions = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const utils_1 = require("../utils");
const Mentions = (_a) => {
    var { value, onChange, renderSuggestions, trigger = '@', isInsertSpaceAfterMention = false, inputRef: propInputRef, mentionTextStyle = utils_1.defaultMentionTextStyle, containerStyle, onSelectionChange } = _a, textInputProps = __rest(_a, ["value", "onChange", "renderSuggestions", "trigger", "isInsertSpaceAfterMention", "inputRef", "mentionTextStyle", "containerStyle", "onSelectionChange"]);
    const textInput = react_1.useRef(null);
    const [selection, setSelection] = react_1.useState({ start: 0, end: 0 });
    const { plainText, parts } = react_1.useMemo(() => utils_1.getPartsFromValue(trigger, value), [value]);
    const handleSelectionChange = (event) => {
        setSelection(event.nativeEvent.selection);
        onSelectionChange && onSelectionChange(event);
    };
    /**
     * Callback that trigger on TextInput text change
     * We should:
     *
     * - Find all change positions
     *
     * - Remove all parts that was fully deleted
     * - Update parts that was partly deleted
     *
     * - Update parts that has added stuff
     *
     * - Remove mention data if some affected part is mention
     * @param changedText
     */
    const onChangeInput = (changedText) => {
        onChange(utils_1.generateValueFromPartsAndChangedText(parts, plainText, changedText));
    };
    /**
     * We memoize the keyword to know should we show mention suggestions or not.
     * If keyword is undefined then we don't tracking mention typing and shouldn't show suggestions.
     * If keyword is not undefined (even empty string '') then we are tracking mention typing.
     *
     * Examples where @name is just plain text yet, not mention:
     * '|abc @name dfg' - keyword is undefined
     * 'abc @| dfg' - keyword is ''
     * 'abc @name| dfg' - keyword is 'name'
     * 'abc @na|me dfg' - keyword is 'na'
     * 'abc @|name dfg' - keyword is against ''
     * 'abc @name |dfg' - keyword is against undefined'
     */
    const keyword = react_1.useMemo(() => {
        if (selection.end != selection.start) {
            return undefined;
        }
        if (parts.some(one => one.data != null && selection.end >= one.position.start && selection.end <= one.position.end)) {
            return undefined;
        }
        const triggerIndex = plainText.lastIndexOf(trigger, selection.end);
        const spaceIndex = plainText.lastIndexOf(' ', selection.end - 1);
        const newLineIndex = plainText.lastIndexOf('\n', selection.end - 1);
        switch (true) {
            case triggerIndex == -1:
                return undefined;
            case triggerIndex === selection.end:
                return undefined;
            case triggerIndex < spaceIndex:
                return undefined;
            // When we have a mention at the very beginning of text
            case spaceIndex == -1 && newLineIndex == -1:
            // When we have a mention on the new line
            case newLineIndex + trigger.length === triggerIndex:
            // When we have a mention just after space
            case spaceIndex + trigger.length === triggerIndex:
                return plainText.substring(triggerIndex + trigger.length, selection.end);
        }
    }, [parts, plainText, selection, trigger]);
    /**
     * Callback on mention suggestion press. We should:
     * - Find part with plain text where we were tracking mention typing using selection state
     * - Split the part to next parts:
     * -* Before new mention
     * -* With new mention
     * -* After mention with space at the beginning
     * - Generate new parts array
     * - Trigger onChange callback with new value generated from the new parts array (using toValue)
     *
     * @param suggestion
     */
    const onMentionSuggestionPress = (suggestion) => {
        var _a;
        const currentPartIndex = parts.findIndex(one => selection.end >= one.position.start && selection.end <= one.position.end);
        const currentPart = parts[currentPartIndex];
        if (!currentPart) {
            return;
        }
        const triggerPartIndex = currentPart.text.lastIndexOf(trigger, selection.end - currentPart.position.start);
        const spacePartIndex = currentPart.text.lastIndexOf(' ', selection.end - currentPart.position.start - 1);
        if (spacePartIndex > triggerPartIndex) {
            return;
        }
        const newMentionPartPosition = {
            start: triggerPartIndex,
            end: selection.end - currentPart.position.start,
        };
        const isInsertSpaceToNextPart = isInsertSpaceAfterMention
            // Cursor is at the very end of parts or text row
            && (plainText.length === selection.end || ((_a = parts[currentPartIndex]) === null || _a === void 0 ? void 0 : _a.text.startsWith('\n', newMentionPartPosition.end)));
        const newParts = [
            ...parts.slice(0, currentPartIndex),
            // Create part with string before mention
            utils_1.generatePart(currentPart.text.substring(0, newMentionPartPosition.start)),
            utils_1.generateMentionPart(trigger, Object.assign(Object.assign({}, suggestion), { original: utils_1.getMentionValue(suggestion) })),
            // Create part with rest of string after mention and add a space if needed
            utils_1.generatePart(`${isInsertSpaceToNextPart ? ' ' : ''}${currentPart.text.substring(newMentionPartPosition.end)}`),
            ...parts.slice(currentPartIndex + 1),
        ];
        onChange(utils_1.getValueFromParts(newParts));
        /**
         * Move cursor to the end of just added mention starting from trigger string and including:
         * - Length of trigger string
         * - Length of mention name
         * - Length of space after mention (1)
         *
         * Not working now due to the RN bug
         */
        // const newCursorPosition = currentPart.position.start + triggerPartIndex + trigger.length +
        // suggestion.name.length + 1;
        // textInput.current?.setNativeProps({selection: {start: newCursorPosition, end: newCursorPosition}});
    };
    const handleTextInputRef = (ref) => {
        textInput.current = ref;
        if (propInputRef) {
            if (typeof propInputRef === 'function') {
                propInputRef(ref);
            }
            else {
                propInputRef.current = ref;
            }
        }
    };
    return (react_1.default.createElement(react_native_1.View, { style: containerStyle },
        renderSuggestions && renderSuggestions({
            keyword,
            onSuggestionPress: onMentionSuggestionPress,
        }),
        react_1.default.createElement(react_native_1.TextInput, Object.assign({}, textInputProps, { ref: handleTextInputRef, multiline: true, onChangeText: onChangeInput, onSelectionChange: handleSelectionChange }),
            react_1.default.createElement(react_native_1.Text, null, parts.map(({ text, data }, index) => data ? (react_1.default.createElement(react_native_1.Text, { key: `${index}-m`, style: mentionTextStyle }, text)) : (react_1.default.createElement(react_native_1.Text, { key: index }, text)))))));
};
exports.Mentions = Mentions;
//# sourceMappingURL=mentions.js.map