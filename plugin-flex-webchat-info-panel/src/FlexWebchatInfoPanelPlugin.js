import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import reducers, { namespace } from './states';

const PLUGIN_NAME = 'FlexWebchatInfoPanelPlugin';

function ContextInfoPanelSection(props) {
    const { task } = props;
    return (
      <>
        <hr />
        <h1>Client info</h1>
        {Object.entries(task._task.attributes).map(([key, value]) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))}
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
