import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      //Navbar
      language: 'english',
      dropdown: 'Additional',
      mainpage: 'Home',
      search: 'search',
      login: 'Login',
      logout: 'Logout',
      themeLightDropdown: 'Light theme',
      themeDarkDropdown: 'Dark theme',
      languageDropdown: 'Russian language',
      adminPageDropdown: 'Admin Page',
      // login
      errorLoginPassword: 'Wrong-password',
      errorLogin: 'Invalid-email',
      errorManyRequests: 'Too-many-requests',
      userNotFound: 'User-not-found',
      signup: 'Sign up!',
      email: 'Email address',
      enterEmail: 'Enter email',
      password: 'Password',
      loginGoogle: 'Login with Google',
      privacy: "We'll never share your email with anyone else.",
      // sign up
      username: 'Username',
      enterUsername: 'Enter username',
      // createpost
      createPost: 'Create post!',
      choosePostCategory: 'Choose category',
      title: 'Title',
      postText: 'Your text...',
      categoryError: 'Category not selected',
      addTags: 'Add tags',
      // admin
      verify: 'Verify admin',
      deletePosts: 'Delete all posts!',
      appointAdmin: 'Appoint admin',
      userLink: 'User link',
      refresh: 'Refresh',
      postId: 'Post id',
      category: 'Category',
      userRating: 'User rating',
      authorRating: 'Author rating',
      likes: 'Likes',
      сreated: 'Created',
      // MainPage
      morePosts: 'More Posts!',
      tags: 'Tags:',
      filter: 'Filter',
      latest: 'Latest',
      highRating: 'High rating',
      // Profile
      deletePost: 'Delete!',
      deletePostText: 'Dlete Post!',
      // create post
      awesome: 'Awesome!',
      great: 'Great!',
      okay: 'Okay',
      bad: 'Bad',
      horrible: 'Horrible',
      rating: 'Rating',
      openMenu: 'Open this select menu',
      upload: 'Upload your photos(10 Max)!',
      edit: 'Edit',
      yourTextHere: 'Your text here',
      preview: 'Preview',
      submit: 'Submit!',
    },
  },
  ru: {
    translation: {
      //Navbar
      language: 'russian',
      dropdown: 'Дополнительно',
      mainpage: 'Главное',
      search: 'Поиск',
      login: 'Войти',
      logout: 'Выйти',
      themeLightDropdown: 'Светлая тема',
      themeDarkDropdown: 'Тёмная тема',
      languageDropdown: 'Английский язык',
      adminPageDropdown: 'Администратор',
      // login
      errorLoginPassword: 'Неправильный пароль',
      errorLogin: 'Invalid-email',
      userNotFound: 'Пользователь не найден',
      signup: 'Зарегистрироватся!',
      email: 'Email адрес',
      enterEmail: 'Введите mail',
      password: 'Пароль',
      loginGoogle: 'Войти с помощью Google',
      privacy: 'Мы не передаём данные третьи лицам',
      // sign up
      username: 'Имя пользователя',
      enterUsername: 'Введите имя пользователя',
      // createpost
      createPost: 'Создать пост!',
      choosePostCategory: 'Выбор категории',
      title: 'Заголовок',
      postText: 'Ваш текст...',
      categoryError: 'Категория не выбрана',
      addTags: 'Добавьте Тэги)',
      // admin
      verify: 'Проверить администратора',
      deletePosts: 'Удалить все посты!',
      appointAdmin: 'Назначить админом',
      userLink: 'Ссылка на пользователя',
      refresh: 'Перезагрузка таблицы',
      postId: 'id Поста',
      category: 'Категория',
      userRating: 'Рейтинг пользователей',
      authorRating: 'Рейтинг автора',
      likes: 'Лайки',
      сreated: 'Создано',
      // MainPage
      morePosts: 'Показать ещё!',
      filter: 'Фильтр',
      latest: 'Последние',
      highRating: 'Высокий рэйтинг',
      // Post
      tags: 'Тэги:',
      // Profile
      deletePost: 'Удалить!',
      deletePostText: 'Удалить Пост!',
      // create post
      awesome: 'Превосходно!',
      great: 'Отлично!',
      okay: 'Хорошо',
      bad: 'Плохо',
      horrible: 'Ужасно',
      rating: 'Рэйтинг',
      openMenu: 'Открыть меню',
      upload: 'Загрузите фото (10 максимум)!',
      edit: 'Редактор',
      yourTextHere: 'Ваш текст',
      preview: 'Превью',
      submit: 'Создать!',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ru', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
