import React from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-expo"; // for React Native via Expo GLView
const shaders = Shaders.create({
  helloBlue: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float blue;
void main() {
  gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
}`
  }
});

class HelloBlue extends React.Component {
  render() {
    const { blue } = this.props;
    return <Node shader={shaders.helloBlue} uniforms={{ blue }} />;
  }
}

export default class GLTest extends React.Component {
  render() {
    return (
      <Surface style={{ width: 300, height: 500 }}>
        <HelloBlue blue={0.5} />
      </Surface>
    )
  }
}