# isem3027 Mobile App

## Use this repo
1. Choose the "branch" from top left corner "main"
2. Check the code in that branch

## New Project by Expo
1. Ensure expo-cli up-to-date
```
npm install -g expo-cli
```
> MacOS users may need using sudo `sudo npm install -g expo-cli`

2. Initialize a new project "AwesomeProject"
```
expo init AwesomeProject
```
> choose **Blank** , not ~~Blank (TypeScript)~~

3. Install all needed packages in this project
```
cd AwesomeProject
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view react-native-vector-icons @react-native-async-storage/async-storage react-native-elements
```
4. Start the project
```
npm start
```


