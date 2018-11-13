'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroMaterials,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroSphere,
  ViroARPlane,
  ViroParticleEmitter
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />

        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        <ViroNode position={[0, -1, 0]} dragType="FixedToWorld" onDrag={() => { }} >
          <Viro3DObject
            source={require('./res/emoji_smile.vrx')}
            resources={[require('./res/emoji_smile_diffuse.png'),
            require('./res/emoji_smile_normal.png'),
            require('./res/emoji_smile_specular.png')]}
            position={[-1.5, .5, -1]}
            scale={[.2, .2, .2]}
            type="VRX" />
        </ViroNode>


        <ViroNode>
            <ViroARImageMarker target="brewDog" position={[0, 0, 0]}>
              <ViroBox scale={[.3, .3, .1]} materials={["grid"]} animation={{ name: "rotate", run: true, loop: true }} />        
            </ViroARImageMarker>
        </ViroNode>

        <ViroNode>
          <ViroSphere
            heightSegmentCount={10}
            widthSegmentCount={10}
            radius={1}
            position={[2, 2, 0]}
            materials={["spherematerial"]}
          />
        </ViroNode>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
  spherematerial: {
    diffuseTexture: require('./res/steel-2.jpg')
  }
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },
  moveUp: { properties: { positionY: "+=0.6" }, duration: 10000 },

});

ViroARTrackingTargets.createTargets({
  "brewDog": {
    source: require('./res/brewDog.jpg'),
    orientation: "up",
    physicalWidth: 0.1
  }
})



module.exports = HelloWorldSceneAR;
  