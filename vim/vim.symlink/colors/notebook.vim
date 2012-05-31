" Vim color file
" Converted from Textmate theme Notebook using Coloration v0.2.5 (http://github.com/sickill/coloration)

set background=dark
highlight clear

if exists("syntax_on")
  syntax reset
endif

let g:colors_name = "Notebook"

hi Cursor  guifg=NONE guibg=#000000 gui=NONE
hi Visual  guifg=NONE guibg=#f5f4f0 gui=NONE
hi CursorLine  guifg=NONE guibg=#c8c2ad gui=NONE
hi CursorColumn  guifg=NONE guibg=#c8c2ad gui=NONE
hi LineNr  guifg=#787363 guibg=#beb69d gui=NONE
hi VertSplit  guifg=#a39c87 guibg=#a39c87 gui=NONE
hi MatchParen  guifg=#c52727 guibg=NONE gui=NONE
hi StatusLine  guifg=#312f29 guibg=#a39c87 gui=bold
hi StatusLineNC  guifg=#312f29 guibg=#a39c87 gui=NONE
hi Pmenu  guifg=NONE guibg=NONE gui=NONE
hi PmenuSel  guifg=NONE guibg=#f5f4f0 gui=NONE
hi IncSearch  guifg=NONE guibg=#c08776 gui=NONE
hi Search  guifg=NONE guibg=#c08776 gui=NONE
hi Directory  guifg=#c5bda7 guibg=#7ccfd3 gui=NONE
hi Folded  guifg=#dfd2b6 guibg=#beb69d gui=NONE

hi Normal  guifg=#312f29 guibg=#beb69d gui=NONE
hi Boolean  guifg=#c5bda7 guibg=#7ccfd3 gui=NONE
hi Character  guifg=#c5bda7 guibg=#7ccfd3 gui=NONE
hi Comment  guifg=#dfd2b6 guibg=NONE gui=italic
hi Conditional  guifg=#c52727 guibg=NONE gui=NONE
hi Constant  guifg=NONE guibg=NONE gui=NONE
hi Define  guifg=#c52727 guibg=NONE gui=NONE
hi ErrorMsg  guifg=#ffffff guibg=#bf363b gui=NONE
hi WarningMsg  guifg=#ffffff guibg=#bf363b gui=NONE
hi Float  guifg=#312f29 guibg=#a3ec5a gui=NONE
hi Function  guifg=NONE guibg=NONE gui=NONE
hi Identifier  guifg=#c5bda7 guibg=#aca38c gui=NONE
hi Keyword  guifg=#c52727 guibg=NONE gui=NONE
hi Label  guifg=#c5bda7 guibg=#ded049 gui=NONE
hi NonText  guifg=#b0a58b guibg=#c8c2ad gui=NONE
hi Number  guifg=#312f29 guibg=#a3ec5a gui=NONE
hi Operator  guifg=#c52727 guibg=NONE gui=NONE
hi PreProc  guifg=#c52727 guibg=NONE gui=NONE
hi Special  guifg=#312f29 guibg=NONE gui=NONE
hi SpecialKey  guifg=#b0a58b guibg=#c8c2ad gui=NONE
hi Statement  guifg=#c52727 guibg=NONE gui=NONE
hi StorageClass  guifg=#c5bda7 guibg=#aca38c gui=NONE
hi String  guifg=#c5bda7 guibg=#ded049 gui=NONE
hi Tag  guifg=#312f29 guibg=#b4aa93 gui=NONE
hi Title  guifg=#312f29 guibg=NONE gui=bold
hi Todo  guifg=#dfd2b6 guibg=NONE gui=inverse,bold,italic
hi Type  guifg=NONE guibg=NONE gui=NONE
hi Underlined  guifg=NONE guibg=NONE gui=underline
hi rubyClass  guifg=#c52727 guibg=NONE gui=NONE
hi rubyFunction  guifg=NONE guibg=NONE gui=NONE
hi rubyInterpolationDelimiter  guifg=NONE guibg=NONE gui=NONE
hi rubySymbol  guifg=#c5bda7 guibg=#7ccfd3 gui=NONE
hi rubyConstant  guifg=#1d368f guibg=NONE gui=NONE
hi rubyStringDelimiter  guifg=#c5bda7 guibg=#ded049 gui=NONE
hi rubyBlockParameter  guifg=NONE guibg=NONE gui=NONE
hi rubyInstanceVariable  guifg=#c5bda7 guibg=#9ea982 gui=NONE
hi rubyInclude  guifg=#c52727 guibg=NONE gui=NONE
hi rubyGlobalVariable  guifg=#c5bda7 guibg=#9ea982 gui=NONE
hi rubyRegexp  guifg=#c5bda7 guibg=#ded049 gui=NONE
hi rubyRegexpDelimiter  guifg=#c5bda7 guibg=#ded049 gui=NONE
hi rubyEscape  guifg=#c5bda7 guibg=#7ccfd3 gui=NONE
hi rubyControl  guifg=#c52727 guibg=NONE gui=NONE
hi rubyClassVariable  guifg=NONE guibg=NONE gui=NONE
hi rubyOperator  guifg=#c52727 guibg=NONE gui=NONE
hi rubyException  guifg=#c52727 guibg=NONE gui=NONE
hi rubyPseudoVariable  guifg=#c5bda7 guibg=#9ea982 gui=NONE
hi rubyRailsUserClass  guifg=#1d368f guibg=NONE gui=NONE
hi rubyRailsARAssociationMethod  guifg=#c5bda7 guibg=#d78c9c gui=NONE
hi rubyRailsARMethod  guifg=#c5bda7 guibg=#d78c9c gui=NONE
hi rubyRailsRenderMethod  guifg=#c5bda7 guibg=#d78c9c gui=NONE
hi rubyRailsMethod  guifg=#c5bda7 guibg=#d78c9c gui=NONE
hi erubyDelimiter  guifg=#c5bda7 guibg=#d2ccba gui=NONE
hi erubyComment  guifg=#dfd2b6 guibg=NONE gui=italic
hi erubyRailsMethod  guifg=#c5bda7 guibg=#d78c9c gui=NONE
hi htmlTag  guifg=NONE guibg=NONE gui=NONE
hi htmlEndTag  guifg=NONE guibg=NONE gui=NONE
hi htmlTagName  guifg=NONE guibg=NONE gui=NONE
hi htmlArg  guifg=NONE guibg=NONE gui=NONE
hi htmlSpecialChar  guifg=#c5bda7 guibg=#9bdac5 gui=NONE
hi javaScriptFunction  guifg=#c5bda7 guibg=#aca38c gui=NONE
hi javaScriptRailsFunction  guifg=#c5bda7 guibg=#d78c9c gui=NONE
hi javaScriptBraces  guifg=NONE guibg=NONE gui=NONE
hi yamlKey  guifg=#312f29 guibg=#b4aa93 gui=NONE
hi yamlAnchor  guifg=#c5bda7 guibg=#9ea982 gui=NONE
hi yamlAlias  guifg=#c5bda7 guibg=#9ea982 gui=NONE
hi yamlDocumentHeader  guifg=#c5bda7 guibg=#ded049 gui=NONE
hi cssURL  guifg=NONE guibg=NONE gui=NONE
hi cssFunctionName  guifg=#c5bda7 guibg=#d78c9c gui=NONE
hi cssColor  guifg=#c5bda7 guibg=#7ccfd3 gui=NONE
hi cssPseudoClassId  guifg=NONE guibg=NONE gui=NONE
hi cssClassName  guifg=#312f29 guibg=#b4aa93 gui=NONE
hi cssValueLength  guifg=#312f29 guibg=#a3ec5a gui=NONE
hi cssCommonAttr  guifg=#c5bda7 guibg=#d78c9c gui=NONE
hi cssBraces  guifg=NONE guibg=NONE gui=NONE

