- Semantic Elements
  => Meaningful elements like article, header, nav, footer, section, main, aside

- CSS positions
  => Static - default
  Relative - position relative to the UI
  absolute - parent keep relative & child keep absolute & handle with top right left etc.
  sticky - position sticky until the threshold. it's relative to the parent
  fixed - position is fixed on the ui. it doesn't move. it's relative to the viewport

- CSS Specifity
  => inline styles > id > class > pseudo elements

🔥 Architect-Level Summary
| Keyword | Scope Type |
| ------- | ----------- |
| var | Function scoped |
| let | Block scoped |
| const | Block scoped |

Important correction ❗

var let & const comparision table

| Feature       | var             | let       | const     |
| ------------- | --------------- | --------- | --------- |
| Scope         | Function        | Block     | Block     |
| Hoisted       | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Re-declare    | ✅ Yes          | ❌ No     | ❌ No     |
| Re-assign     | ✅ Yes          | ✅ Yes    | ❌ No     |
| Init required | ❌ No           | ❌ No     | ✅ Yes    |
