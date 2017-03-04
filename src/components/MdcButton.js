import { h } from 'preact';
import '@material/button/dist/mdc.button.min.css';
import './MdcButton.css';

export default ({ children, onClick }) => (
    <button class="mdc-button mdc-button--raised mdc-button--accent" onClick={onClick}>{children}</button>
);
