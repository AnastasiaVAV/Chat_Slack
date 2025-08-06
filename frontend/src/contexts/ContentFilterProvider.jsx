import { useMemo } from 'react'
import * as leoProfanity from 'leo-profanity'
import ContentFilterContext from './ContentFilterContext.jsx'

const ContentFilterProvider = ({ children }) => {
  const profanityFilter = useMemo(() => {
    leoProfanity.loadDictionary('ru')
    const enWords = leoProfanity.getDictionary('en')
    leoProfanity.add(enWords)

    return text => leoProfanity.clean(text)
  }, [])

  return (
    <ContentFilterContext.Provider value={profanityFilter}>
      {children}
    </ContentFilterContext.Provider>
  )
}

export default ContentFilterProvider
