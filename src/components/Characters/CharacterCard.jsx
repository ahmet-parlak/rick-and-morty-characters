import PropTypes from "prop-types";
import { useLazyQuery } from "@apollo/client";
import { GET_CHARACTER_DETAILS } from "../../Apollo/queries";

import { Modal, Image, Card, Skeleton } from "antd";
import CharacterCardDetails from "./CharacterCardDetails";
import { MainLoaing } from "../Loading";

function CharacterCard({ character, loading }) {
  const [getCharacter, { loading: characterDetailsLoading }] = useLazyQuery(GET_CHARACTER_DETAILS);

  const showCharacter = () => {
    getCharacter({
      variables: {
        id: character.id,
      },
    }).then(({ data, error }) => {
      if (error) {
        console.log(error);
      }

      Modal.info({
        icon: null,
        content: (
          <CharacterCardDetails
            character={data?.character}
            loading={loading}
            error={error?.message ?? error}
          />
        ),
      });
    });
  };

  return (
    <>
      {characterDetailsLoading && <MainLoaing delay={300} />}
      <Card
        onClick={showCharacter}
        loading={loading}
        hoverable
        style={{ width: 240 }}
        cover={
          loading ? (
            <>
              <Skeleton.Image active={true} style={{ width: "100%", height: "240px" }} />
            </>
          ) : (
            <Image
              src={character?.image}
              preview={false}
              placeholder={
                <Skeleton.Image active={true} style={{ width: "240px", height: "240px" }} />
              }
            />
          )
        }
      >
        <Card.Meta title={character?.name} description={character?.species} />
      </Card>
    </>
  );
}

CharacterCard.propTypes = {
  loading: PropTypes.bool,
  character: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    species: PropTypes.string,
  }),
};

export default CharacterCard;
