import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Modal, TouchableHighlight } from 'react-native';
import { UserDetailManager } from './controller';
import * as enums from '../../../utils/enums';
import theme from '../../../resources/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  CometChatSharedMedia,
  CometChatAvatar,
  CometChatUserPresence,
} from '../../Shared';
import { logger } from '../../../utils/common';
import { CometChat } from '@cometchat-pro/react-native-chat';
import style from './styles';
import BottomSheet from 'reanimated-bottom-sheet';
import * as actions from '../../../utils/actions';
import { deviceHeight } from '../../../utils/consts';
import DropDownAlert from '../../Shared/DropDownAlert';
import { CometChatContext } from '../../../utils/CometChatContext';

export default class CometChatUserDetails extends React.Component {
  static contextType = CometChatContext;
  constructor(props) {
    super(props);

    this.viewTheme = { ...theme, ...this.props.theme };
    this.sheetRef = React.createRef(null);
    this.state = {
      status: this.props.item.status,
      restrictions: null,
    };
  }

  componentDidMount() {
    this.checkRestrictions();
    this.setStatusForUser();
    this.UserDetailManager = new UserDetailManager();
    this.UserDetailManager.attachListeners(this.updateUser);
  }

  updateUser = (key, user) => {
    switch (key) {
      case enums.USER_ONLINE:
      case enums.USER_OFFLINE: {
        if (
          this.props.type === CometChat.ACTION_TYPE.TYPE_USER &&
          this.props.item.uid === user.uid
        ) {
          //if user presence feature is disabled
          if (this.state.isUserPresenceEnabled === false) {
            return false;
          }

          let status = '';
          if (user.status === CometChat.USER_STATUS.OFFLINE) {
            status = 'OFFLINE';
          } else if (user.status === CometChat.USER_STATUS.ONLINE) {
            status = 'ONLINE';
          }

          this.setState({ status: status });
        }
        break;
      }
      default:
        break;
    }
  };

  /**
   * Update bottom sheet to 0th snap point if prop received as open
   */
  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.sheetRef.current.snapTo(0);
    }
    if (JSON.stringify(prevProps.item) !== JSON.stringify(this.props.item)) {
      this.setStatusForUser();
    }
  }

  checkRestrictions = async () => {
    let isSharedMediaEnabled =
      await this.context.FeatureRestriction.isSharedMediaEnabled();
    let isBlockUserEnabled =
      await this.context.FeatureRestriction.isBlockUserEnabled();
    let isViewProfileEnabled =
      await this.context.FeatureRestriction.isViewProfileEnabled();
    let isUserPresenceEnabled =
      await this.context.FeatureRestriction.isUserPresenceEnabled();
    this.setState({
      restrictions: {
        isSharedMediaEnabled,
        isBlockUserEnabled,
        isViewProfileEnabled,
        isUserPresenceEnabled,
      },
    });
  };

  setStatusForUser = () => {
    try {
      let { status } = this.props.item;
      if (
        this.props.item.status === CometChat.USER_STATUS.OFFLINE &&
        this.props.item.lastActiveAt
      ) {
        let messageTimestamp = new Date(this.props.item.lastActiveAt * 1000);
        const currentTimestamp = new Date();

        if (
          messageTimestamp.getUTCFullYear() ==
            currentTimestamp.getUTCFullYear() &&
          messageTimestamp.getUTCMonth() == currentTimestamp.getUTCMonth() &&
          messageTimestamp.getUTCDate() == currentTimestamp.getUTCDate()
        ) {
          var hours = messageTimestamp.getHours();
          var minutes = messageTimestamp.getMinutes();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12;
          minutes = minutes < 10 ? '0' + minutes : minutes;
          status = hours + ':' + minutes + ' ' + ampm.toUpperCase();
        } else if (
          messageTimestamp.getUTCFullYear() ==
            currentTimestamp.getUTCFullYear() &&
          messageTimestamp.getUTCMonth() == currentTimestamp.getUTCMonth() &&
          messageTimestamp.getUTCDate() == currentTimestamp.getUTCDate() - 1
        ) {
          var hours = messageTimestamp.getHours();
          var minutes = messageTimestamp.getMinutes();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12;
          minutes = minutes < 10 ? '0' + minutes : minutes;
          status =
            'Yesterday, ' + hours + ':' + minutes + ' ' + ampm.toUpperCase();
        } else {
          status = messageTimestamp.toLocaleDateString('en-US');
        }
      } else if (this.props.item.status === CometChat.USER_STATUS.OFFLINE) {
        status = 'offline';
      }

      this.setState({ status });
    } catch (error) {
      logger(error);
    }
  };

  render() {
    let blockUserText;

    let avatar = (
      <View style={style.avatarStyle}>
        <CometChatAvatar
          cornerRadius={32}
          borderColor={theme.color.secondary}
          borderWidth={1}
          image={{ uri: this.props.item.avatar }}
          name={this.props.item.name}
        />
        {this.props.item &&
        this.props.item.blockedByMe &&
        !this.state.restrictions?.isUserPresenceEnabled ? null : (
          <CometChatUserPresence
            status={this.state.status}
            style={{ top: 35 }}
            cornerRadius={9}
            borderColor={theme.borderColor.white}
            borderWidth={2}
          />
        )}
      </View>
    );
    if (this.props.item && this.props.item.blockedByMe) {
      blockUserText = (
        <TouchableOpacity
          onPress={() => {
            this.props.actionGenerated(actions.UNBLOCK_USER);
          }}>
          <Text
            style={[style.itemLinkStyle, { color: this.viewTheme.color.red }]}>
            Unblock User
          </Text>
        </TouchableOpacity>
      );
    } else {
      blockUserText = (
        <TouchableOpacity
          onPress={() => {
            this.props.actionGenerated(actions.BLOCK_USER);
          }}>
          <Text
            style={[style.itemLinkStyle, { color: this.viewTheme.color.red }]}>
            Block User
          </Text>
        </TouchableOpacity>
      );
    }

    let showProfile = (
      <TouchableOpacity
        onPress={() => {
          this.props.actionGenerated(actions.SHOW_PROFILE);
        }}>
        <Text
          style={[style.itemLinkStyle, { color: this.viewTheme.color.blue }]}>
          View Profile
        </Text>
      </TouchableOpacity>
    );

    if (!this.state.restrictions?.isViewProfileEnabled) {
      showProfile = null;
    }

    let blockUserView = (
      <View style={style.blockContainer}>
        <Text
          style={[
            style.sectionHeaderStyle,
            { color: this.viewTheme.color.secondary },
          ]}>
          PRIVACY & SUPPORT
        </Text>
        <View style={style.blockText}>{blockUserText}</View>
      </View>
    );

    if (!this.state.restrictions?.isBlockUserEnabled) {
      blockUserView = null;
    }

    let action =
      this.props.item?.link && this.state.restrictions?.isViewProfileEnabled ? (
        <View style={style.blockContainer}>
          <Text
            style={[
              style.sectionHeaderStyle,
              { color: this.viewTheme.color.secondary },
            ]}>
            ACTIONS
          </Text>

          <View style={style.blockText}>{showProfile}</View>
        </View>
      ) : null;

    let sharedMediaView = (
      <CometChatSharedMedia
        theme={this.props.theme}
        containerHeight={50}
        showMessage={(type, message) => {
          this.dropDownAlertRef?.showMessage(type, message);
        }}
        item={this.props.item}
        type={this.props.type}
      />
    );

    if (!this.state.restrictions?.isSharedMediaEnabled) {
      sharedMediaView = null;
    }
    return (
      <Modal
        transparent
        animated
        animationType="fade"
        visible={this.props.open}
        onRequestClose = {() =>{
          this.props.actionGenerated(actions.CLOSE_DETAIL);
        }} >
        <TouchableOpacity
          onPress={() => this.props.actionGenerated(actions.CLOSE_DETAIL)}
          style={style.container}>
          <BottomSheet
            ref={this.sheetRef}
            snapPoints={[deviceHeight - 80, 0]}
            borderRadius={30}
            initialSnap={0}
            enabledInnerScrolling={false}
            enabledContentTapInteraction
            overdragResistanceFactor={10}
            renderContent={() => {
              return (
                <TouchableHighlight>
                <View style={style.reactionDetailsContainer}>
                  <View
                    style={[
                      style.headerStyle,
                      { borderColor: this.viewTheme.borderColor.primary },
                    ]}>
                    <TouchableOpacity
                      style={style.headerCloseStyle}
                      onPress={() =>
                        this.props.actionGenerated(actions.CLOSE_DETAIL)
                      }>
                      <Icon
                        name="keyboard-arrow-left"
                        size={24}
                        color="#000000"
                        style={{ marginRight: 5 }}
                      />
                    </TouchableOpacity>
                    <Text style={style.headerTitleStyle}>Details</Text>
                  </View>
                  <View style={style.userDetailContainer}>
                    {avatar}
                    <View style={style.userDetail}>
                      <View>
                        <Text style={style.userName}>
                          {this.props.item.name}
                        </Text>
                      </View>
                      {this.props.item && this.props.item.blockedByMe ? null : (
                        <Text style={style.statusText} numberOfLines={1}>
                          {this.state.status}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={style.optionsContainer}>
                    {action}
                    {blockUserView}

                    {sharedMediaView}
                  </View>
                </View>
                </TouchableHighlight>
              );
            }}
            onCloseEnd={() => {
              this.props.actionGenerated(actions.CLOSE_DETAIL);
            }}
          />
        </TouchableOpacity>
        <DropDownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
      </Modal>
    );
  }
}
