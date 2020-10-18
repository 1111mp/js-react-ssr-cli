type Dispose = () => void
type InsertCssItem = () => Dispose
type GetCSSItem = () => string
type GetContent = () => string

interface Style {
  [key: string]: InsertCssItem | GetCSSItem | GetContent | string
  _insertCss: InsertCssItem
  _getCss: GetCSSItem
  _getContent: GetContent
}

declare module '*.styl' {
  const style: Style
  export default style
}

declare module '*.scss' {
  const style: Style
  export default style
}

declare module '*.css' {
  const style: Style
  export default style
}

declare module 'isomorphic-style-loader/useStyles' {
  function useStyles(...styles: Style[]): void
  export default useStyles
}

declare module 'isomorphic-style-loader/StyleContext' {
  import { Context } from 'react'

  type RemoveGlobalCss = () => void
  type InsertCSS = (...styles: Style[]) => RemoveGlobalCss | void
  interface StyleContextValue {
    insertCss: InsertCSS
  }

  const StyleContext: Context<StyleContextValue>

  export { StyleContext as default, InsertCSS }
}