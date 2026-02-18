# React Native Guidebook

> A Complete Beginner-to-Advanced React Native Learning Handbook

---

# Chapter 1: Project Configuration & Foundations

Before learning React Native components, hooks, and navigation, it is important to understand the configuration files that control how the application behaves.

---

# 1. tsconfig.json

## What is tsconfig.json?

`tsconfig.json` is the configuration file for TypeScript.

It tells TypeScript:

- Which files to check
- How strict type checking should be
- How imports should be resolved
- Which language features are allowed

Think of it as:

```text
React Native = Building a House
TypeScript = Quality Inspector
tsconfig.json = Rule Book for the Inspector
```

---

## Example

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Important Properties

### extends

```json
"extends": "expo/tsconfig.base"
```

Uses Expo's recommended TypeScript configuration.

---

### strict

```json
"strict": true
```

Enables strict type checking.

Benefits:

- Prevents runtime bugs
- Detects invalid types early
- Improves code quality

---

### paths

```json
"paths": {
  "@/*": ["./src/*"]
}
```

Creates import aliases.

Instead of:

```ts
import Button from "../../../../components/Button";
```

Use:

```ts
import Button from "@/components/Button";
```

---

### include

```json
"include": [
  "**/*.ts",
  "**/*.tsx"
]
```

Specifies which files TypeScript should check.

---

## Enterprise-Level Options

```json
{
  "strict": true,
  "baseUrl": ".",
  "noImplicitAny": true,
  "noUnusedLocals": true,
  "resolveJsonModule": true,
  "skipLibCheck": true
}
```

---

## Key Takeaways

- `extends` uses Expo defaults.
- `strict` should always be enabled.
- `paths` simplifies imports.
- `include` controls which files are checked.
- Enterprise projects use stricter compiler rules.

---

# 2. package.json

## What is package.json?

The central configuration file of a JavaScript project.

It contains:

- Project information
- Dependencies
- Scripts
- Package versions

Think of it as:

```text
Project Identity Card
+
Dependency Manager
+
Command Center
```

---

## Important Properties

### name

```json
"name": "real-estate-app"
```

Project name.

---

### version

```json
"version": "1.0.0"
```

Application version.

---

### main

```json
"main": "expo-router/entry"
```

Application entry point.

---

### dependencies

Packages required to run the application.

Example:

```json
{
  "react": "19.x",
  "react-native": "0.85.x",
  "expo": "56.x"
}
```

---

### devDependencies

Packages needed only during development.

Example:

```json
{
  "typescript": "^6.0.0",
  "@types/react": "^19.0.0"
}
```

---

### scripts

Reusable terminal commands.

Example:

```json
{
  "start": "expo start",
  "android": "expo start --android"
}
```

Usage:

```bash
npm run android
```

---

## Key Takeaways

- `dependencies` are required in production.
- `devDependencies` are required only for development.
- `scripts` simplify commands.
- `main` defines the application's entry point.

---

# 3. node_modules

## What is node_modules?

The folder where all installed packages are stored.

Example:

```text
node_modules
├── react
├── react-native
├── expo
└── expo-router
```

---

## Why Is It Large?

Every package can have its own dependencies.

Example:

```text
Your App
   ↓
Expo
   ↓
Package A
   ↓
Package B
```

This creates a large dependency tree.

---

## Important Rule

Never commit:

```text
node_modules
```

to Git.

Always add it to:

```text
.gitignore
```

---

# 4. package-lock.json

## What is package-lock.json?

Stores the exact dependency versions installed.

---

### package.json

```json
{
  "react": "^19.2.3"
}
```

Allows multiple compatible versions.

---

### package-lock.json

```json
{
  "react": {
    "version": "19.2.3"
  }
}
```

Locks the exact version.

---

## Why It Exists

Ensures:

```text
Developer A
Developer B
CI/CD Server
Production
```

all use the same dependency versions.

---

## Important Rule

Commit:

```text
package-lock.json
```

Do NOT commit:

```text
node_modules
```

---

# 5. npm install

## What Happens?

When running:

```bash
npm install
```

npm:

1. Reads package.json
2. Downloads packages
3. Creates node_modules
4. Updates package-lock.json

---

## Installation Flow

```text
package.json
      ↓
npm install
      ↓
Download Packages
      ↓
node_modules
      ↓
package-lock.json
```

---

## Common Commands

Install package:

```bash
npm install axios
```

Install dev dependency:

```bash
npm install -D typescript
```

Remove package:

```bash
npm uninstall axios
```

---

# 6. app.json

## What is app.json?

Configuration file for the mobile application.

Think of it as:

```text
package.json → Configures JavaScript

app.json → Configures Mobile App
```

---

## Important Properties

### name

```json
"name": "Real Estate App"
```

Displayed below app icon.

---

### slug

```json
"slug": "real-estate-app"
```

Unique Expo project identifier.

---

### version

```json
"version": "1.0.0"
```

App version.

---

### orientation

```json
"orientation": "portrait"
```

Restricts screen rotation.

---

### icon

```json
"icon": "./assets/icon.png"
```

Application icon.

---

### scheme

```json
"scheme": "realestateapp"
```

Used for deep linking.

Example:

```text
realestateapp://property/123
```

---

### userInterfaceStyle

```json
"userInterfaceStyle": "automatic"
```

Controls dark/light mode behavior.

---

### android

Android-specific configuration.

Example:

```json
{
  "package": "com.company.realestateapp"
}
```

---

### ios

iOS-specific configuration.

Example:

```json
{
  "bundleIdentifier": "com.company.realestateapp"
}
```

---

### plugins

Configure native features.

Example:

```json
["expo-router", "expo-splash-screen"]
```

---

### experiments

Enable experimental Expo features.

Example:

```json
{
  "typedRoutes": true,
  "reactCompiler": true
}
```

---

## Key Takeaways

- Controls app identity.
- Controls icons and splash screens.
- Configures Android and iOS.
- Enables deep linking.
- Registers Expo plugins.

---

# Chapter 2: React Native Fundamentals

---

# 7. Application Startup Flow

## High-Level Flow

```text
npm start
     ↓
expo start
     ↓
package.json
     ↓
main = expo-router/entry
     ↓
Expo Router Starts
     ↓
Scans app Folder
     ↓
Loads _layout.tsx
     ↓
Creates Navigation Tree
     ↓
Loads Initial Route
     ↓
Component Executes
     ↓
Returns JSX
     ↓
React Native Renders Native UI
```

---

## Expo Router Flow

```text
expo-router/entry
      ↓
app/_layout.tsx
      ↓
Navigation
      ↓
Screen
      ↓
Render UI
```

---

## Why \_layout.tsx Is Important

Acts as the root of the application.

Typically contains:

- Navigation
- Theme Providers
- Authentication Providers
- Font Loading
- Splash Screen Logic

---

## Key Takeaways

- Expo Router is the application entry point.
- `_layout.tsx` loads before screens.
- Screens are discovered automatically.
- Navigation is generated from file structure.

---

# 8. JSX vs TSX

## JSX

JSX stands for:

```text
JavaScript XML
```

Allows UI to be written inside JavaScript.

Example:

```jsx
<View>
  <Text>Hello</Text>
</View>
```

---

## TSX

TSX stands for:

```text
TypeScript XML
```

TSX = JSX + TypeScript

Example:

```tsx
type Props = {
  name: string;
};

function User({ name }: Props) {
  return <Text>{name}</Text>;
}
```

---

## JSX Rules

### Single Parent Element

Correct:

```tsx
<View>
  <Text>Hello</Text>
  <Text>World</Text>
</View>
```

---

### JavaScript Uses Curly Braces

```tsx
<Text>{name}</Text>
```

---

### Expressions Allowed

```tsx
<Text>{5 + 5}</Text>
```

---

### Statements Not Allowed

Invalid:

```tsx
{if(true)}
```

Use:

```tsx
{
  isLoggedIn ? "Welcome" : "Login";
}
```

---

## JSX Rendering Flow

```text
Component
     ↓
Returns JSX
     ↓
React Converts JSX
     ↓
Virtual Tree
     ↓
Native UI
```

---

## Key Takeaways

- JSX is not HTML.
- TSX is JSX with TypeScript.
- Curly braces execute JavaScript expressions.
- Components return JSX.
- React Native converts JSX into native views.

```

```

# 9. Flexbox & Styling

## What is Flexbox?

Flexbox is React Native's layout system.

It controls:

- Positioning
- Alignment
- Spacing
- Responsive layouts

Think:

```text
View = Room
Flexbox = Interior Designer
```

---

## Default Direction

React Native default:

```tsx
flexDirection: "column";
```

Items render from top to bottom.

---

## flexDirection

### Column

```tsx
flexDirection: "column";
```

```text
A
B
C
```

### Row

```tsx
flexDirection: "row";
```

```text
A B C
```

---

## justifyContent

Controls alignment on the main axis.

Common values:

```tsx
justifyContent: "flex-start";
justifyContent: "center";
justifyContent: "flex-end";
justifyContent: "space-between";
justifyContent: "space-around";
```

---

## alignItems

Controls alignment on the cross axis.

Common values:

```tsx
alignItems: "flex-start";
alignItems: "center";
alignItems: "flex-end";
```

---

## flex

```tsx
flex: 1;
```

Makes a component take all available space.

---

## Common Styling Properties

```tsx
flex;
flexDirection;

justifyContent;
alignItems;

padding;
margin;

width;
height;

backgroundColor;

borderRadius;

fontSize;
fontWeight;
color;
```

---

## Key Takeaways

- React Native uses Flexbox for layouts.
- Default direction is `column`.
- `justifyContent` controls main-axis alignment.
- `alignItems` controls cross-axis alignment.
- `flex: 1` fills available space.
- Padding = inside spacing.
- Margin = outside spacing.

# 10. TextInput

## What is TextInput?

`TextInput` allows users to enter text.

Examples:

- Login Forms
- Registration Forms
- Search Bars
- OTP Inputs
- Chat Inputs

---

## Basic Example

```tsx
<TextInput placeholder="Enter Name" />
```

---

## Common Props

### placeholder

```tsx
placeholder = "Enter Email";
```

Displays hint text.

---

### keyboardType

```tsx
keyboardType = "email-address";
keyboardType = "numeric";
keyboardType = "phone-pad";
```

Changes keyboard layout.

---

### secureTextEntry

```tsx
secureTextEntry;
```

Masks password input.

---

### maxLength

```tsx
maxLength={6}
```

Limits character count.

---

### autoCapitalize

```tsx
autoCapitalize = "none";
```

Controls automatic capitalization.

---

### multiline

```tsx
multiline;
```

Allows multiple lines of text.

---

### editable

```tsx
editable={false}
```

Makes input read-only.

---

## Typical Styling

```tsx
style={{
  borderWidth: 1,
  borderColor: "#ccc",
  padding: 12,
  borderRadius: 8,
}}
```

---

## Key Takeaways

- TextInput is used for user input.
- placeholder provides hints.
- secureTextEntry is used for passwords.
- keyboardType changes keyboard layout.
- multiline enables multi-line input.
- value and onChangeText are the most important props for managing input.

# 11. Pressable

## What is Pressable?

`Pressable` is a touchable component used to detect user interactions.

Examples:

- Buttons
- Cards
- Menu Items
- Tabs
- List Items

---

## Basic Example

```tsx
<Pressable>
  <Text>Click Me</Text>
</Pressable>
```

---

## onPress

```tsx
<Pressable
  onPress={() => {
    console.log("Pressed");
  }}
>
  <Text>Press Me</Text>
</Pressable>
```

Runs when the component is tapped.

---

## onLongPress

```tsx
onLongPress={() => {}}
```

Runs when the user holds the component.

---

## onPressIn

```tsx
onPressIn={() => {}}
```

Runs immediately when the finger touches the component.

---

## onPressOut

```tsx
onPressOut={() => {}}
```

Runs when the finger leaves the component.

---

## disabled

```tsx
disabled;
```

Prevents interaction.

---

## Pressed State

```tsx
style={({ pressed }) => ({
  opacity: pressed ? 0.5 : 1,
})}
```

Provides visual feedback while pressing.

---

## Common Styling

```tsx
style={{
  backgroundColor: "#007AFF",
  padding: 16,
  borderRadius: 10,
  alignItems: "center",
}}
```

---

## Key Takeaways

- Pressable handles user touch interactions.
- onPress is the most commonly used prop.
- onLongPress detects hold gestures.
- disabled prevents interaction.
- Pressable can wrap any UI.
- Modern React Native prefers Pressable over TouchableOpacity.

# 12. Image

## What is Image?

`Image` is used to display images in React Native.

Examples:

- Profile Pictures
- Property Photos
- Product Images
- Banners
- Logos

---

## Local Image

```tsx
<Image
  source={require("../assets/images/house.png")}
  style={{
    width: 200,
    height: 200,
  }}
/>
```

---

## Remote Image

```tsx
<Image
  source={{
    uri: "https://example.com/image.jpg",
  }}
  style={{
    width: 300,
    height: 200,
  }}
/>
```

---

## Important Rule

Always provide:

```tsx
width;
height;
```

Otherwise the image may not appear.

---

## resizeMode

### cover

```tsx
resizeMode = "cover";
```

Fills container and may crop image.

---

### contain

```tsx
resizeMode = "contain";
```

Shows the entire image without cropping.

---

### stretch

```tsx
resizeMode = "stretch";
```

Stretches image to fit.

---

## Circular Avatar

```tsx
<Image
  source={{ uri: avatar }}
  style={{
    width: 100,
    height: 100,
    borderRadius: 50,
  }}
/>
```

---

## Local vs Remote Images

### Local

```tsx
require("./image.png");
```

Bundled with application.

### Remote

```tsx
{
  uri: "https://...";
}
```

Downloaded from network.

---

## Key Takeaways

- Image displays images.
- source is the most important prop.
- Width and height are required.
- cover is the most common resizeMode.
- Local images use require().
- Remote images use uri.
- expo-image provides better performance and caching.

# 13. Props

## What are Props?

Props (Properties) are used to pass data from a parent component to a child component.

```text
Parent
  ↓
Props
  ↓
Child
```

---

## Basic Example

Parent:

```tsx
<UserCard name="Shashidhar" />
```

Child:

```tsx
function UserCard(props) {
  return <Text>{props.name}</Text>;
}
```

---

## Destructuring Props

```tsx
function UserCard({ name }) {
  return <Text>{name}</Text>;
}
```

---

## Multiple Props

```tsx
<UserCard name="Shashi" age={24} city="Hyderabad" />
```

---

## Prop Types

Props can be:

```tsx
string;
number;
boolean;
array;
object;
children;
```

---

## children Prop

```tsx
<Card>
  <Text>Hello</Text>
</Card>
```

Component:

```tsx
function Card({ children }) {
  return <View>{children}</View>;
}
```

---

## TypeScript Example

```tsx
type UserCardProps = {
  name: string;
  age: number;
};
```

```tsx
function UserCard({ name, age }: UserCardProps) {
  return (
    <Text>
      {name} - {age}
    </Text>
  );
}
```

---

## Key Takeaways

- Props pass data from parent to child.
- Props are read-only.
- Props make components reusable.
- Data flows in one direction.
- children is a special React prop.
- TypeScript can be used to type props.

# 14. State (useState)

## What is State?

State is data owned by a component that can change over time.

Think:

```text
State = Component Memory
```

---

## Why Do We Need State?

React only updates the UI when state changes.

Regular variables do not trigger UI updates.

---

## Basic Syntax

```tsx
const [count, setCount] = useState(0);
```

Where:

```text
count
↓
Current Value

setCount
↓
Update Function

0
↓
Initial Value
```

---

## Counter Example

```tsx
const [count, setCount] = useState(0);

<Pressable onPress={() => setCount(count + 1)}>
  <Text>Increment</Text>
</Pressable>;
```

---

## TextInput Example

```tsx
const [name, setName] = useState("");

<TextInput value={name} onChangeText={setName} />;
```

---

## State Types

### String

```tsx
useState("");
```

### Number

```tsx
useState(0);
```

### Boolean

```tsx
useState(false);
```

### Array

```tsx
useState([]);
```

### Object

```tsx
useState({});
```

---

## Functional Update

```tsx
setCount((prev) => prev + 1);
```

Recommended when new state depends on previous state.

---

## State vs Props

| Props         | State           |
| ------------- | --------------- |
| Read-only     | Mutable         |
| Parent-owned  | Component-owned |
| External Data | Internal Data   |

---

## Key Takeaways

- State is component memory.
- useState creates state.
- setState updates state.
- State changes trigger re-renders.
- Never modify state directly.
- Use functional updates when relying on previous state.

# 15. Rendering & Re-rendering

## What is Rendering?

Rendering is the process where React executes a component and creates the UI.

Example:

```tsx
function HomeScreen() {
  return <Text>Hello World</Text>;
}
```

---

## Initial Render

```text
Component Executes
      ↓
Returns JSX
      ↓
UI Appears
```

---

## What is Re-rendering?

Re-rendering means React executes the component function again.

Example:

```tsx
setCount(count + 1);
```

State changes:

```text
State Change
      ↓
Re-render
      ↓
Updated UI
```

---

## What Causes Re-renders?

### State Changes

```tsx
setCount(1);
```

### Props Changes

```tsx
<UserCard name="Rahul" />
```

### Parent Re-renders

Parent updates can trigger child re-renders.

---

## What Does NOT Cause Re-renders?

### Normal Variables

```tsx
let count = 0;
count++;
```

React does not track normal variables.

---

## Rendering Flow

```text
State Changes
      ↓
Component Executes Again
      ↓
New JSX Created
      ↓
UI Updated
```

---

## React Mental Model

```text
UI = f(State)
```

The UI is derived from state.

Whenever state changes, React recalculates the UI.

---

## Key Takeaways

- Rendering = Component execution.
- Re-rendering = Component executes again.
- State changes trigger re-renders.
- Props changes trigger re-renders.
- Normal variables do not trigger re-renders.
- Re-rendering is normal and expected.

# 16. Event Handling

## What is Event Handling?

Event handling is the process of responding to user interactions.

Examples:

- Button Presses
- Text Input Changes
- Long Presses
- Gestures

---

## Event Flow

```text
User Action
      ↓
Event
      ↓
Handler
      ↓
Action
```

---

## onPress

```tsx
<Pressable
  onPress={() => {
    console.log("Pressed");
  }}
>
  <Text>Press Me</Text>
</Pressable>
```

Runs when user taps.

---

## onLongPress

```tsx
onLongPress={() => {}}
```

Runs when user holds a component.

---

## onChangeText

```tsx
<TextInput
  onChangeText={(text) => {
    console.log(text);
  }}
/>
```

Runs whenever input changes.

---

## Callback Functions

```tsx
() => {
  console.log("Hello");
};
```

Callbacks are executed later when an event occurs.

---

## Handler Functions

```tsx
const handlePress = () => {
  console.log("Pressed");
};
```

```tsx
<Pressable onPress={handlePress} />
```

---

## Passing Parameters

Wrong:

```tsx
onPress={handlePress()}
```

Correct:

```tsx
onPress={() =>
  handlePress("Shashi")
}
```

---

## Common Mistakes

### Wrong

```tsx
onPress={console.log("Hello")}
```

### Correct

```tsx
onPress={() =>
  console.log("Hello")
}
```

---

## Key Takeaways

- Events are user interactions.
- Handlers respond to events.
- Callbacks execute later.
- onPress is the most common event.
- onChangeText handles input changes.
- Use function references instead of immediately executing functions.

# 17. Lists (FlatList & SectionList)

## Why Do We Need Lists?

Lists allow rendering multiple items dynamically.

Examples:

- Properties
- Products
- Messages
- Users
- Notifications

---

## map()

```tsx
{
  properties.map((property) => <Text>{property}</Text>);
}
```

Useful for small lists.

---

## FlatList

Optimized list component for React Native.

```tsx
<FlatList data={properties} renderItem={({ item }) => <Text>{item}</Text>} />
```

---

## Important Props

### data

```tsx
data = { properties };
```

Array to render.

---

### renderItem

```tsx
renderItem={({ item }) => (
  <Text>{item}</Text>
)}
```

Defines how each item appears.

---

### keyExtractor

```tsx
keyExtractor={(item) => item.id}
```

Provides unique keys.

---

### horizontal

```tsx
horizontal;
```

Creates horizontal lists.

---

### ListEmptyComponent

```tsx
ListEmptyComponent={
  <Text>No Data</Text>
}
```

Displayed when list is empty.

---

### ListHeaderComponent

```tsx
ListHeaderComponent={
  <Text>Featured Properties</Text>
}
```

Adds a header.

---

## Virtualization

FlatList only renders visible items.

Benefits:

- Better performance
- Lower memory usage
- Faster scrolling

---

## SectionList

Used for grouped lists.

Example:

```text
Apartments
  Luxury Apartment
  Budget Apartment

Villas
  Luxury Villa
  Farm Villa
```

---

## FlatList vs SectionList

| FlatList    | SectionList  |
| ----------- | ------------ |
| Single list | Grouped list |
| Most common | Less common  |

---

## Key Takeaways

- FlatList is the preferred way to render lists.
- keyExtractor should provide unique IDs.
- FlatList uses virtualization.
- SectionList supports grouped data.
- Use FlatList instead of map() for large datasets.

# 18. Navigation (Expo Router)

## What is Navigation?

Navigation is the process of moving between screens.

Examples:

- Home → Profile
- Product List → Product Details
- Properties → Property Details

---

## File-Based Routing

Expo Router generates routes from files.

```text
app
│
├── index.tsx
├── profile.tsx
└── settings.tsx
```

Routes:

```text
/
/profile
/settings
```

---

## router.push()

```tsx
router.push("/profile");
```

Navigates to a new screen.

---

## router.back()

```tsx
router.back();
```

Returns to previous screen.

---

## router.replace()

```tsx
router.replace("/home");
```

Replaces the current screen.

---

## Dynamic Routes

File:

```text
app/property/[id].tsx
```

Routes:

```text
/property/1
/property/2
/property/3
```

---

## Reading Route Params

```tsx
const { id } = useLocalSearchParams();
```

URL:

```text
/property/25
```

Result:

```tsx
id = "25";
```

---

## \_layout.tsx

Root navigation configuration.

```tsx
export default function Layout() {
  return <Stack />;
}
```

---

## Tabs

```tsx
<Tabs />
```

Creates bottom tab navigation.

---

## Route Groups

Folder:

```text
(tabs)
```

Used for organization and does not appear in URLs.

---

## Key Takeaways

- Expo Router uses file-based routing.
- Files automatically become routes.
- router.push navigates forward.
- router.back returns to previous screen.
- router.replace replaces the current screen.
- Dynamic routes use `[id].tsx`.
- `_layout.tsx` configures navigation.
