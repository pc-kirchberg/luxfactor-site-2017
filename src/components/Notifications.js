import { h, Component } from 'preact';
import './Notifications.css';
import Spinner from './Spinner';
import Button from './MdcButton';

const ENABLE_PUSH = true;

export default class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationsSupported: null,
            userSignedUpToPush: false,
            emailOverride: false
        };
    }

    componentDidMount() {
        window.matchMedia('(max-width: 576px)').addListener(() => {
            this.forceUpdate();
        });

        this.updateNotifState();
    }

    updateNotifState() {
        if (!window.OneSignal) {
            window.setTimeout(this.updateNotifState, 250);
        } else {
            window.OneSignal.push(() => {
                this.setState({
                    notificationsSupported: window.OneSignal.isPushNotificationsSupported()
                });
                window.OneSignal.isPushNotificationsEnabled(enabled => {
                    this.setState({
                        userSignedUpToPush: enabled,
                    });
                });
                window.OneSignal.on('subscriptionChange', isSubscribed => {
                    this.setState({
                        userSignedUpToPush: isSubscribed,
                    });
                });
            });
        }
    }

    registerForPush() {
        window.OneSignal.push(() => {
            window.OneSignal.registerForPushNotifications();
            window.OneSignal.setSubscription(true);
            this.updateNotifState()
        });
    }

    unsub() {
        window.OneSignal.push(() => {
            window.OneSignal.setSubscription(false);
            this.updateNotifState()
        });
    }

    render(props, state) {
        if (ENABLE_PUSH) {
            if (state.emailOverride) {
                return this.renderEmailForm();
            }
            switch (this.state.notificationsSupported) {
                case true:
                    return this.renderNotifcationForm();
                case false:
                    return this.renderEmailForm();
                case null:
                    return this.renderSpinner();
            }
        } else {
            return this.renderEmailForm();
        }
    }

    renderNotifcationForm() {
        if (this.state.userSignedUpToPush) {
            return (
                <div class="notif-widget">
                    <strong>Push notifications</strong>
                    <br />
                    <em>You are signed up to push notifications about LUXFACTOR. If you want to unsubscribe, click the
                        button below.</em>
                    <br />
                    <Button onClick={this.unsub.bind(this)}>Unsubscribe</Button>
                    <a href="#" onClick={() => this.setState({ emailOverride: true })}>Want to receive emails too?</a>
                </div>
            );
        } else {
            return (
                <div class="notif-widget">
                    <strong>Subscribe to push notifications</strong>
                    <br />
                    <em>We can send you push notifications when we start selling tickets or there are updates about
                        LUXFACTOR.</em>
                    <br />
                    <Button onClick={this.registerForPush.bind(this)}>Register for Push</Button>
                    <a href="#" onClick={() => this.setState({ emailOverride: true })}>Want to receive emails instead?</a>
                </div>
            );
        }
    }

    renderSpinner() {
        return (
            <div class="notif-widget">
                <Spinner />
            </div>
        );
    }

    renderEmailForm() {
        const content = (
            <div id="mc_embed_signup">
                <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css"/>
                <form
                    action="//pupilscom-esl1.us13.list-manage.com/subscribe/post?u=b3b1779754e6fe6cec8eb4c40&amp;id=538869464c&SIGNUP=luxfactor"
                    method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate"
                    target="_blank" novalidate>
                    <div id="mc_embed_signup_scroll">
                        <h2>Subscribe to email notifications</h2>
                        <div class="mc-field-group">
                            <label for="mce-EMAIL">Email Address </label>
                            <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL"/>
                        </div>
                        <div class="mc-field-group input-group">
                            <strong>What do you want to get emails about? </strong>
                            <ul>
                                <li><input type="checkbox" value="1" name="group[6637][1]" id="mce-group[6637]-6637-0"/><label
                                    for="mce-group[6637]-6637-0">Monthly Newsletter</label></li>
                                <li><input type="checkbox" value="2" name="group[6637][2]" id="mce-group[6637]-6637-1"/><label
                                    for="mce-group[6637]-6637-1">Important Announcements</label></li>
                                <li><input type="checkbox" value="64" name="group[6637][64]" id="mce-group[6637]-6637-6"
                                           checked/><label for="mce-group[6637]-6637-6">Luxfactor</label></li>
                            </ul>
                        </div>
                        <div id="mce-responses" class="clear">
                            <div class="response" id="mce-error-response" style="display:none"></div>
                            <div class="response" id="mce-success-response" style="display:none"></div>
                        </div>
                        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text"
                                                                                                  name="b_b3b1779754e6fe6cec8eb4c40_538869464c"
                                                                                                  tabindex="-1"
                                                                                                  value=""/></div>
                        <div class="clear"><input type="submit" value="Subscribe" name="subscribe"
                                                  id="mc-embedded-subscribe"
                                                  class="mdc-button mdc-button--raised mdc-button--accent"/></div>
                    </div>
                </form>
            </div>
        );

        if (window.matchMedia('(max-width: 576px)').matches) {
            if (this.props.small) {
                return null;
            }
            return <div>{content}</div>;
        } else {
            return (
                <div className={`notif-widget ${this.props.small && 'hide-on-small'}`}>
                    {content}
                </div>
            );
        }
    }
}