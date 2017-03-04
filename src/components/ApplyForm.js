import { h, Component } from 'preact';
import Button from './MdcButton';
import './ApplyForm.css';

const FORM_URL = 'https://forms.office.com/Pages/ResponsePage.aspx?id=aeA505McU0OzBwsicDW6QvZQkNAc0qxLtLwBVhyvhPRUMFhKS0NJNTRBODBNMkxMQ1I5MTdTVlpDUS4u';

export default class ApplyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
        };
    }

    openForm() {
        window.ga('send', 'event', 'apply-form', 'open');
        window.open(FORM_URL, '_blank');
    }

    render(props, state) {
        return (
            <div class="apply-form">
                <Button onClick={this.openForm.bind(this)}>OPEN FORM</Button>
            </div>
        );
    }
}