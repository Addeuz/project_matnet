import { Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { SButton, SRow, SCol } from '../../../styles/styled';
import EditUserModal from './EditUserModal';
import HeadingData from '../Utils/HeadingData';
import DeleteModal from '../../DeleteModal';
import authHeader from '../../../services/auth-header';
import { UserEditingRight } from '../Utils/EngineHeadingData';

const CustomerDiv = styled.div`
  height: 150px;
  overflow: auto;

  @media only screen and (max-width: 768px) {
    height: auto;
  }
`;

const RightButton = styled(SButton)`
  float: right;
  margin: 0.5rem 0.5rem 0.5rem 0;

  @media only screen and (max-width: 768px) {
    float: initial;
  }
`;

const RightButtonDelete = styled(Button)`
  float: right;
  margin: 0.5rem 0.5rem 0.5rem 0;

  @media only screen and (max-width: 768px) {
    float: initial;
  }
`;

// Component that handles showing the data of a user
// props:
//    user - client data that is passed from the map in /pages/admin/users.js
//    clients - clients added into mätnet
//    roles - roles that exists in mätnet

const UserData = ({ user, roles, clients }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);

  return (
    <>
      <SRow>
        <Col xs={12} md={5}>
          <HeadingData header="Användarnamn">{user.username}</HeadingData>
          <HeadingData header="Förnamn">{user.firstname}</HeadingData>
          <HeadingData header="Efternamn">{user.lastname}</HeadingData>
          <HeadingData header="Email">{user.email}</HeadingData>
          <HeadingData header="Telefonnummer">{user.phonenumber}</HeadingData>
        </Col>
        <Col xs={12} md={4}>
          {user.roles[0] ? (
            <HeadingData header="Roll">{user.roles[0].name}</HeadingData>
          ) : (
            <HeadingData header="Roll">Ingen roll tilldelad</HeadingData>
          )}
          <HeadingData header="Kunder">
            <CustomerDiv>
              {user.clients[0] ? (
                user.clients.map(client => (
                  <p key={client.id}>{client.clientName}</p>
                ))
              ) : (
                <p>Inga kunder tillagda</p>
              )}
            </CustomerDiv>
          </HeadingData>
        </Col>
        <Col xs={12} md={3}>
          <RightButton
            // TODO: extend this to a styled component
            onClick={() => setModalShow(true)}
          >
            Redigera
          </RightButton>
          <RightButtonDelete
            variant="danger"
            // TODO: extend this to a styled component
            onClick={() => setDeleteModalShow(true)}
          >
            Ta bort
          </RightButtonDelete>
        </Col>

        <EditUserModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          user={user}
          roles={roles}
          clients={clients}
        />
        <DeleteModal
          show={deleteModalShow}
          onHide={() => setDeleteModalShow(false)}
          onDelete={() => {
            const options = {
              headers: authHeader(),
            };

            axios
              .delete(
                `http://localhost:3000/api/admin/user/${user.id}`,
                options
              )
              .then(callback => {
                window.location.reload();
              });
          }}
          title={user.username}
        >
          <p>Är du säker på att du vill ta bort {user.username}?</p>
        </DeleteModal>
        <Col xs={12}>
          <h6>Rättigheter att lägga till data</h6>
        </Col>
        <Col xs={6} md={3}>
          <UserEditingRight header="Motormon" canEdit={user.motormon} />
          <UserEditingRight header="Baker" canEdit={user.baker} />
          <UserEditingRight
            header="Meggning stator"
            canEdit={user.meggningstator}
          />
          <UserEditingRight
            header="Meggning rotor"
            canEdit={user.meggningrotor}
          />
          <UserEditingRight header="Driftström" canEdit={user['driftström']} />
          <UserEditingRight header="Lind temp" canEdit={user.lindtemp} />
          <UserEditingRight header="Vibration" canEdit={user.vibration} />
          <UserEditingRight header="Smörning" canEdit={user['smörjning']} />
          <UserEditingRight
            header="Okulär extern"
            canEdit={user['okulärextern']}
          />
          <UserEditingRight
            header="Okulär intern"
            canEdit={user['okulärintern']}
          />
          <UserEditingRight header="Mantel temp" canEdit={user.manteltemp} />
          <UserEditingRight
            header="Släpringsyta"
            canEdit={user['släpringsyta']}
          />
          <UserEditingRight header="Lager kond DE" canEdit={user.lagerkondde} />
          <UserEditingRight
            header="Lager kond NDE"
            canEdit={user.lagerkondnde}
          />
        </Col>
        <Col xs={6} md={4}>
          <UserEditingRight header="Spm DE" canEdit={user.spmde} />
          <UserEditingRight header="Spm NDE" canEdit={user.spmnde} />
          <UserEditingRight header="Lager temp DE" canEdit={user.lagertempde} />
          <UserEditingRight
            header="Lager temp NDE"
            canEdit={user.lagertempnde}
          />
          <UserEditingRight
            header="Lager isolering"
            canEdit={user.lagerisolering}
          />
          <UserEditingRight header="Renhet" canEdit={user.renhet} />
          <UserEditingRight header="Kylpaket" canEdit={user.kylpaket} />
          <UserEditingRight header="Kolborstar" canEdit={user.kolborstar} />
          <UserEditingRight
            header="Varvtalsgivare"
            canEdit={user.varvtalsgivare}
          />
          <UserEditingRight header="Tan-delta" canEdit={user['tan-delta']} />
          <UserEditingRight header="Pol-index" canEdit={user['pol-index']} />
          <UserEditingRight
            header="Kommutatoryta"
            canEdit={user.kommutatoryta}
          />
          <UserEditingRight
            header="Kollektortemp"
            canEdit={user.kollektortemp}
          />
          <UserEditingRight header="Driftservice" canEdit={user.driftservice} />
          <UserEditingRight header="Stoppservice" canEdit={user.stoppservice} />
        </Col>
      </SRow>
    </>
  );
};
export default UserData;
