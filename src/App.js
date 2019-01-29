import React, { Component } from 'react';
import './App.css';

class SubscriptionInfo extends Component {
  render() {
    var onclick = () => window.open(this.props.subscription.cancelLink,'_blank');
    var daysRemainingClass = this.props.subscription.daysToPayment <= 7 ? "subscription_box_days_expiring" : "subscription_box_days";
    return (
      <div>
        <div class={daysRemainingClass}>Days remaining: {this.props.subscription.daysToPayment}</div>
        <div class="subscription_box_price">${this.props.subscription.cost} {this.props.subscription.subscriptionType}</div>
        <button class="Button" onClick={onclick}>Unsubscribe</button>
      </div>
    );
  }
}

class SubscriptionItem extends Component {
  render() {
    return (
      <div class="subscription_box">
        <div class="subscription_image_div">
          <img class="subscription_image" src={require(`./static/` + this.props.subscription.image)}/>
        </div>
        {/* <div class="subscription_box_title">{this.props.subscription.name}</div> */}
        <SubscriptionInfo subscription={this.props.subscription}/>
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
      <div class="subscription_table">
        {subscription_list}
      </div>
    );
  }
}

class SubscriptionSummary extends Component {
  render() {
    var anualCost = 0;
    var subscriptionCount = 0;
    if(this.props.subscriptions) {
      this.props.subscriptions.forEach(function(subscription) {
        if(subscription.subscriptionType == "monthly"){
          anualCost += 12 * subscription.cost;
        } else if(subscription.subscriptionType == "yearly"){
          anualCost += subscription.cost;
        } else if(subscription.subscriptionType == "twice yearly"){
          anualCost += 2 * subscription.cost;
        }
        subscriptionCount += 1;
      });
    }
    return (
      <div class="summary">You are spending <anualcost>${anualCost}</anualcost> each year on {subscriptionCount} subscriptions.</div>
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
        <div class="page_title">Manage Subscriptions</div>
        <SubscriptionTable subscriptions={this.state.subscriptions}/>
        <SubscriptionSummary subscriptions={this.state.subscriptions}/>
      </div>
    );
  }
}

export default App;
