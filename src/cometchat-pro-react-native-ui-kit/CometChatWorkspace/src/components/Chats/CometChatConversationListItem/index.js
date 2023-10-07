/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import { CometChat } from '@cometchat-pro/react-native-chat';
import * as enums from '../../../utils/enums';
import {
  CometChatUserPresence,
  CometChatBadgeCount,
  CometChatAvatar,
} from '../../Shared';

import styles from './styles';
import { View, TouchableOpacity, Text } from 'react-native';
import { Platform } from 'react-native';
import { formatAMPM, logger } from '../../../utils/common';
import { CometChatContext } from '../../../utils/CometChatContext';
import CometChatDeleteMessageIcon
  from '../../Messages/CometChatDeleteMessageIcon/CometChatDeleteMessageIcon';

const conversation = 'conversation';
const lastMessage = 'lastMessage';
const deletedAt = 'deletedAt';
const sentAt = 'sentAt';

class CometChatConversationListItem extends React.Component {
  static contextType = CometChatContext;
  constructor(props) {
    super(props);

    this.state = {
      lastMessage: '',
      isLastMessageDeleted: false,
      lastMessageTimestamp: '',
      isThreaded: false,
      restrictions: null,
    };
  }

  componentDidMount() {
    const timestamp = this.getLastMessageTimestamp();

    this.setState({
      lastMessageTimestamp: timestamp,
    });

    this.checkRestrictions();
  }

  checkRestrictions = async () => {
    let isUnreadCountEnabled = await this.context.FeatureRestriction.isUnreadCountEnabled();
    let isHideDeletedMessagesEnabled = await this.context.FeatureRestriction.isHideDeletedMessagesEnabled();

    this.setState(
      {
        restrictions: { isUnreadCountEnabled, isHideDeletedMessagesEnabled },
      },
      () => {
        const message = this.getLastMessage();
        this.setState({ lastMessage: message || '' });
      },
    );
  };

  componentDidUpdate(prevProps) {
    try {
      const previousItem = JSON.stringify(prevProps.conversation);
      const currentItem = JSON.stringify(this.props.conversation);

      if (previousItem !== currentItem) {
        const message = this.getLastMessage();
        const timestamp = this.getLastMessageTimestamp();

        this.setState({
          lastMessage: message || '',
          lastMessageTimestamp: timestamp,
        });
      }
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Retrieve last message from conversation object
   * @param
   */
  getLastMessage = () => {
    try {
      this.setState( { isLastMessageDeleted: false } );
      if (
        Object.prototype.hasOwnProperty.call(this.props, conversation) === false
      ) {
        return false;
      }

      if (
        Object.prototype.hasOwnProperty.call(
          this.props.conversation,
          lastMessage,
        ) === false
      ) {
        return false;
      }

      let message = null;
      const { lastMessage: lastMessageObject } = this.props.conversation;

      if (Object.prototype.hasOwnProperty.call(lastMessageObject, deletedAt)) {
        if (this.state?.restrictions?.isHideDeletedMessagesEnabled) {
          message = '';
        } else {
          this.setState( { isLastMessageDeleted: true } );
          message =
            this.props.loggedInUser.uid === lastMessageObject.sender.uid
              ? 'You deleted this message.'
              : 'This message was deleted.';
        }
      } else {
        switch (lastMessageObject.category) {
          case 'message':
            message = this.getMessage(lastMessageObject);
            break;
          case 'call':
            message = this.getCallMessage(lastMessageObject);
            break;
          case 'action':
            message = lastMessageObject.message;
            break;
          case 'custom':
            message = this.getCustomMessage(lastMessageObject);
            break;
          default:
            break;
        }
      }

      return message;
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Retrieve last message timestamp from conversation object
   * @param
   */
  getLastMessageTimestamp = () => {
    try {
      if (
        Object.prototype.hasOwnProperty.call(this.props, conversation) === false
      ) {
        return false;
      }

      if (
        Object.prototype.hasOwnProperty.call(
          this.props.conversation,
          lastMessage,
        ) === false
      ) {
        return false;
      }

      if (
        Object.prototype.hasOwnProperty.call(
          this.props.conversation.lastMessage,
          sentAt,
        ) === false
      ) {
        return false;
      }

      let timestamp = null;

      const messageTimestamp = new Date(
        this.props.conversation.lastMessage.sentAt * 1000,
      );
      const currentTimestamp = Date.now();

      const diffTimestamp = currentTimestamp - messageTimestamp;

      if (diffTimestamp < 24 * 60 * 60 * 1000) {
        timestamp = messageTimestamp.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });
        if (Platform.OS === 'android' && timestamp !== 'Yesterday') {
          timestamp = formatAMPM( messageTimestamp );
        }
      } else if (diffTimestamp < 48 * 60 * 60 * 1000) {
        timestamp = 'Yesterday';
      } else if (diffTimestamp < 7 * 24 * 60 * 60 * 1000) {
        timestamp = messageTimestamp.toLocaleDateString('en-US', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        });
      } else {
        timestamp = messageTimestamp.toLocaleDateString('en-US', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        });
      }

      return timestamp;
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Retrieve last message for messageType - custom
   * @param lastMessage - message object
   */
  getCustomMessage = (lastMessage) => {
    try {
      let message = null;
      switch (lastMessage.type) {
        case enums.CUSTOM_TYPE_POLL:
          message = 'Poll';
          break;
        case enums.CUSTOM_TYPE_STICKER:
          message = 'Sticker';
          break;
        case 'meeting':
          message = 'Video Call';
          break;
        default:
          break;
      }

      return message;
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Retrieve last message for messageType - message
   * @param lastMessage - message object
   */
  getMessage = (lastMessage) => {
    try {
      let message = null;
      this.setState({ isThreaded: lastMessage.parentMessageId });
      switch (lastMessage.type) {
        case CometChat.MESSAGE_TYPE.TEXT:
          message = lastMessage.text;
          break;
        case CometChat.MESSAGE_TYPE.MEDIA:
          message = 'Media message';
          break;
        case CometChat.MESSAGE_TYPE.IMAGE:
          message = '📷 Image ';
          break;
        case CometChat.MESSAGE_TYPE.FILE:
          message = '📁 File';
          break;
        case CometChat.MESSAGE_TYPE.VIDEO:
          message = '🎥 Video';
          break;
        case CometChat.MESSAGE_TYPE.AUDIO:
          message = '🎵 Audio';
          break;
        case CometChat.MESSAGE_TYPE.CUSTOM:
          message = 'Custom message';
          break;
        default:
          break;
      }

      return message;
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Retrieve last message for messageType - call
   * @param lastMessage - message object
   */
  getCallMessage = (lastMessage) => {
    try {
      let message = null;
      switch (lastMessage.type) {
        case CometChat.MESSAGE_TYPE.VIDEO:
          message = 'Video call';
          break;
        case CometChat.MESSAGE_TYPE.AUDIO:
          message = 'Audio call';
          break;
        default:
          break;
      }

      return message;
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Retrieve avatar from conversation object
   * @param
   */
  getAvatar = () => {
    try {
      let avatar;
      if (this.props.conversation.conversationType === 'user') {
        avatar = { uri: this.props.conversation.conversationWith.avatar };
      } else if (this.props.conversation.conversationType === 'group') {
        avatar = { uri: this.props.conversation.conversationWith.icon };
      }
      return avatar;
    } catch (error) {
      logger(error);
    }
  };

  render() {
    let lastMessageTimeStamp = null;
    if (this.state.lastMessage) {
      lastMessageTimeStamp = (
        <Text style={styles.itemLastMsgTimeStyle} numberOfLines={1}>
          {this.state.lastMessageTimestamp}
        </Text>
      );
    }

    let presence;

    if (this.props.conversation.conversationType === 'user') {
      const { status } = this.props.conversation.conversationWith;
      presence = (
        <CometChatUserPresence
          status={status}
          style={{ top: 30 }}
          cornerRadius={18}
          borderColor={this.props.theme.color.white}
          borderWidth={2}
        />
      );
    }
    return (
      <View key={this.props?.conversation?.conversationId}>
        <TouchableOpacity
          activeOpacity={1}
          underlayColor={this.props.theme.backgroundColor.listUnderlayColor}
          style={styles.listItem}
          onPress={() =>
            this.props.handleClick(
              this.props.conversation,
              this.props.conversationKey,
            )
          }>
          <View style={styles.itemThumbnailStyle}>
            <CometChatAvatar
              image={this.getAvatar()}
              cornerRadius={25}
              borderColor={this.props.theme.color.secondary}
              borderWidth={0}
              name={this.props.conversation.conversationWith.name}
            />
            {presence}
          </View>
          <View
            style={[
              styles.itemDetailsContainer,
              { borderBottomColor: this.props.theme.borderColor.primary },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}>
              <Text numberOfLines={1} style={styles.itemNameStyle}>
                {this.props.conversation.conversationWith.name}
              </Text>
              <View style={styles.itemLastMsgStyle}>
                {lastMessageTimeStamp}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}>
              <View style={[{ flexDirection: 'row'}, styles.itemLastMsg]}>
                {/* ${this.state.isThreaded ? 'In a thread : ' : '' */}
                {this.state.isLastMessageDeleted && <CometChatDeleteMessageIcon />}
                <Text numberOfLines={1} style={styles.itemLastMsgTimeStyle}>{this.state.lastMessage}</Text>
              </View>

              {this.state.restrictions?.isUnreadCountEnabled ? (
                <CometChatBadgeCount
                  theme={this.props.theme}
                  count={this.props.conversation.unreadMessageCount}
                />
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default CometChatConversationListItem;
