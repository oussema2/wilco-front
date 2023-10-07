import React, { createRef } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import VideoPlayer from 'react-native-video-controls';
import theme from '../../../resources/theme';
import CometChatThreadedMessageReplyCount from '../CometChatThreadedMessageReplyCount';
import CometChatMessageReactions from '../../Messages/Extensions/CometChatMessageReactions';
import CometChatReadReceipt from '../CometChatReadReceipt';
import style from './styles';
import CometChatAvatar from '../../Shared/CometChatAvatar';
import * as actions from '../../../utils/actions';
import * as enums from '../../../utils/enums';
import { CometChat } from '@cometchat-pro/react-native-chat';

const CometChatReceiverVideoMessageBubble = (props) => {
  const message = {
    ...props.message,
    messageFrom: enums.MESSAGE_FROM_RECEIVER,
  };
  const viewTheme = { ...theme, ...props.theme };
  const player = createRef();
  let senderAvatar = null;
  if (message.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
    senderAvatar = { uri: message.sender.avatar };
  }
  return (
    <View style={style.container}>
      <View style={style.innerContainer}>
        {props.message.receiverType === CometChat.RECEIVER_TYPE.GROUP ? (
          <View style={style.avatarStyle}>
            <CometChatAvatar
              cornerRadius={18}
              borderColor={viewTheme.color.secondary}
              borderWidth={0}
              image={senderAvatar}
              name={message.sender.name}
            />
          </View>
        ) : null}
        <View>
          {props.message.receiverType === CometChat.RECEIVER_TYPE.GROUP ? (
            <View style={style.senderNameContainer}>
              <Text style={{ color: viewTheme.color.helpText }}>
                {message.sender.name}
              </Text>
            </View>
          ) : null}
          <View style={style.messageWrapperStyle}>
            <TouchableOpacity
              style={style.messageVideoWrapperStyle}
              onPress={() => {
                props.actionGenerated(actions.VIEW_ACTUAL_VIDEO, message);
              }}
              onLongPress={() =>
                props.actionGenerated(actions.OPEN_MESSAGE_ACTIONS, message)
              }>
              <VideoPlayer
                source={{
                  uri: message.data.url,
                }} // Can be a URL or a local file.
                ref={player} // Store reference
                style={style.messageVideo}
                navigator={props.navigator}
                disableBack
                disableFullscreen
                disableVolume
                muted
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={style.containerStyle}>
            <View style={style.messageInfoWrapperStyle}>
              <CometChatReadReceipt {...props} message={message} />
              <CometChatThreadedMessageReplyCount
                {...props}
                message={message}
              />
              <CometChatMessageReactions
                theme={props.theme}
                {...props}
                message={message}
                showMessage={props?.showMessage}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CometChatReceiverVideoMessageBubble;
