import { Loading } from '../Loading/Loading';
import { NotFound as NotFoundStyle } from './Style';

type NotFoundProps = {
    loader: boolean;
  usersLength: number;
}

const NotFoundUser = ({ loader, usersLength }: NotFoundProps) => (
  <NotFoundStyle>
    {loader ?
      <Loading /> : usersLength === 0 && <h1>No users found</h1>
    }
  </NotFoundStyle>
);

export default NotFoundUser;