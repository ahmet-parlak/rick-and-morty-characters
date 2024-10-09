import PropTypes from "prop-types";
import { Alert, Image } from "antd";

import Spoiler from "../Spoiler";

function CharacterCardDetails({ character, error }) {
  return (
    <div className="details-container">
      {error && <Alert message="Error" description={error} type="error" showIcon />}
      {character && (
        <div className="character-details-container">
          <Image src={character?.image} preview={false} width={"100%"} />
          <div className="details">
            <div className="details-item name">
              <h3>Name:</h3>
              <span>{character?.name}</span>
            </div>
            <div className="details-item species">
              <h3>Species:</h3>
              <span>{character?.species}</span>
            </div>
            <div className="details-item gender">
              <h3>Gender:</h3>
              <span>{character?.gender}</span>
            </div>
            <div className="details-item location">
              <h3>Location:</h3>
              <span>{character?.location?.name}</span>
            </div>
            <div className="details-item status">
              <h3>Status:</h3>
              <span>
                <Spoiler text={character?.status} />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

CharacterCardDetails.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  character: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    species: PropTypes.string,
    status: PropTypes.string,
    gender: PropTypes.string,
    location: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
};

export default CharacterCardDetails;
