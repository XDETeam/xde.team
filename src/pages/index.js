import "../styles/default.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope);

function Home() {
    return <div className="is-desktop is-vcentered">
        Join the SDD.team!
        <div className="field">
        <p className="control has-icons-left has-icons-right">
            <input
                className="input is-primary is-large is-rounded"
                type="text"
                placeholder="TODO:e-mail?"
            />
            
            <span className="icon is-large is-left">
                <FontAwesomeIcon icon="envelope" />
            </span>

            <span className="icon is-large is-right">
                <i className="fas fa-check"></i>
            </span>

            </p>
        </div>
    </div>;
}
  
export default Home;
