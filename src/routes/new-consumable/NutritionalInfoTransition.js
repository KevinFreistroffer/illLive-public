import React, { Component } from "react";
import {
  CSSTransitionGroup,
  ReactCSSTransitionGroup,
  SwitchTransition,
  FadeTransition
} from "react-transition-group";
const styles = {
  component: {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    zIndex: "99999999999",
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100vh"
  },
  p: {
    fontSize: "3rem"
  }
};
export class NutritionalInfoTransition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [
        { text: "Okay, great, let's set some nutritional information!" }
      ]
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     content: [{ text: "Some new text." }]
    //   });
    // }, 3000);

    setTimeout(() => {
      this.props.setIsTransitioningState(false);
      this.props.setHasSeenNutritionalContentTransition();
    }, 3000);
  }

  render() {
    let content = this.state.content.map((c, index) => {
      return <div key={index}>{c.text}</div>;
    });
    return (
      <div
        style={styles.component}
        class="flex center-all"
        id="nutritional-info-transition"
      >
        <CSSTransitionGroup
          transitionName="content"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {content}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default NutritionalInfoTransition;
