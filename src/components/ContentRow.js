import { h, Component } from 'preact';

export default class ContentRow extends Component {
    render(props, state) {
        let bg;
        switch (props.bg) {
            case 'alt':
                bg = 'main-content__row--altbg';
                break;
            case 'alt2':
                bg = 'main-content__row--altbg2';
                break;
            case 'main':
            default:
                bg = '';
                break;
        }
        let type;
        let transparent = false;
        if (props.fill) {
            type = 'main-content__row--fill';
        } else if (props.footer) {
            type = 'main-content__row--footer';
        } else {
            type = 'main-content__row--transparent';
            transparent = true;
        }
        const className = `main-content__row ${type} ${transparent && bg}`;
        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}