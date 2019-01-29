import React, { Component } from 'react';
import './App.css';

class SubscriptionInfo extends Component {
  render() {
    var onclick = () => window.open(this.props.subscription.unsubscribeLink,'_blank');
    var daysRemainingClass = this.props.subscription.daysToPayment <= 7 ? "subscription_box_days_expiring" : "subscription_box_days";
    return (
      <div>
        <div class={daysRemainingClass}>Days remaining: {this.props.subscription.daysToPayment}</div>
        <div class="subscription_box_price">Renewal cost: ${this.props.subscription.cost}</div>
        <button class="Button" onClick={onclick}>Unsubscribe</button>
      </div>
    );
  }
}

class SubscriptionItem extends Component {
  render() {
    return (
      <div class="subscription_box">
        <div class="subscription_box_title">{this.props.subscription.name}</div>
        <SubscriptionInfo subscription={this.props.subscription}/>
        <img class="subsciption_image" src={require(`./static/hulu.jpg`)}/>
      </div>
    );
  }
}

class SubscriptionTable extends Component {
  render() {
    var subscription_list = [];
    if(this.props.subscriptions) {
      this.props.subscriptions.forEach(function(subscription) {
        subscription_list.push(
          <SubscriptionItem subscription={subscription}/>
        );
      });
    }
    return (
      <ul>{subscription_list}</ul>
    );
  }
}

class App extends Component {
  constructor(props) 
  {
    super(props);
    this.state = {
      subscriptions: null,
    }
  }

  componentDidMount() {
    import("./subscriptions.json")
    .then(json => this.setState({subscriptions: json.default.subscriptions}))
  }

  render() {
    console.log(this.state.subscriptions);
    return (
      <div>
        <div style={{fontSize: 60 + 'px'}}>Manage Subscriptions</div>
        <SubscriptionTable subscriptions={this.state.subscriptions}/>
      </div>
    );
  }
}

export default App;
