import EditPost from './EditPost'
import CreatePost from './CreatePost'
import PostList from './PostList'
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const {t, i18n} = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  }

  return ( 
      <div className='App bg bg-secondary' style={{height: "100%"}}>
        <div>
          <Button onClick={() => changeLanguage('en')} variant="secondary" className="me-2">English</Button>
          <Button onClick={() => changeLanguage('jp')} variant="secondary" className="me-2">日本語</Button>
        </div>
        <CreatePost />
        <EditPost />
        <PostList />
      </div>
  );
}

export default Dashboard;