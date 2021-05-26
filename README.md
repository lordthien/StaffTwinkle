#  **Staff Twinkle**
#

---

**Khuyên nên cài đặt với yarn**

---

---

## **_A. Get Started (Setup environment):_**

---

1. Nodejs: https://nodejs.org/en/ (Cài bản LTS)
2. Yarn (https://yarnpkg.com/lang/en/docs/install/#windows-stable)
3. Java SDK 8: https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
4. Visual Studio Code: https://code.visualstudio.com/Download
5. Git SCM: https://git-scm.com/download/
6. Setup IDE: Xcode / Android Studio:

- **IF use Android Studio**
  ```
  - Android Studio: https://developer.android.com/studio/
  - Configure ANDROID_HOME (c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk)
  - Add platform-tools to Path (c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools)
  - Setup JAVA_HOME (https://confluence.atlassian.com/doc/setting-the-java_home-variable-in-windows-8895.html)
  ```

---

## **_B. Build expo:_**

---

- **Bước 0:**

```
cài expo: npm install —global expo-cli
```

- **Bước 1:**

```
cd Twinkle
```

- **Bước 2:**

```
expo start
```

- **Cài đặt svg của expo (for get svg image):**

  ```
  expo install react-native-svg
  ```

- **Cài đặt axios (for API):**

  ```
  yarn add axios
  ```

- **Cài đặt linear-gradient (Loang màu):**
  ```
  expo install expo-linear-gradient
  ```

---

---

## **_C. Setup Core:_**

---

**1. Step 1 (Core):**

```
yarn add @react-navigation/native
```

- OR

```
npm install @react-navigation/native
```

**2. Step 2 (Expo):**

```
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

**3. Setup for Stack:**

```
yarn add @react-navigation/stack
```

- OR

```
npm install @react-navigation/stack
```


**4. Cài đặt create Bottom Tab navigation:**

```
yarn add @react-navigation/bottom-tabs
```

---

---
