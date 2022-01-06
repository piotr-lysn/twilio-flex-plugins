import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import reducers, { namespace } from './states';
import get from 'lodash.get';

const PLUGIN_NAME = 'FlexWebchatInfoPanelPlugin';

function ContextInfoPanelSection(props) {
    const { task } = props;
    const name = get(task, '_task.attributes.name');
    const mobileNumber = get(task, '_task.attributes.mobile_number');
    const email = get(task, '_task.attributes.email');
    const userId = get(task, '_task.attributes.user_id');
    const type = get(task, '_task.attributes.type');
    const profileLink = get(task, '_task.attributes.profile_link');
    const allowedToSendSms = get(task, '_task.attributes.allowed_to_send_sms');

    return (
      <>
        <hr />
        <h1>Client info</h1>
          <div>Name: {name}</div>
          <div>Email: {email}</div>
          <div>User type: {type}</div>
          {mobileNumber && (
            <div>Mobile: {mobileNumber}</div>
          )}
          {userId && (
            <div>User id: {userId}</div>
          )}
          {profileLink && (
            <div>Profile link: {profileLink}</div>
          )}
          {allowedToSendSms && (
          <div>Allowed to send SMS: {allowedToSendSms}</div>
          )}
      </>
    );
}

export default class FlexWebchatInfoPanelPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);
    flex.TaskInfoPanel.Content.add(
      <ContextInfoPanelSection key="FlexWebchatInfoPanelPlugin-ContextInfoPanelSection" />
    );
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
