import { useTranslation, Trans } from 'react-i18next'
import image404 from '../assets/404.svg'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <img src={image404} alt="Страница не найдена" className="img-fluid h-25"></img>
      <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
      <p className="text-muted">
        <Trans i18nKey="notFoundPage.toMainPage">
          <a href="/"></a>
        </Trans>
      </p>
    </div>
  )
}

export default NotFoundPage
