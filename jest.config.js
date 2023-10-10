export default {
    "verbose": true,
    "testEnvironment": "jsdom",
    "testEnvironmentOptions": {
      "customExportConditions": [
        "node",
        "node-addons"
      ]
    },
    "moduleFileExtensions": [
      "js","ts",
      "json",
      "vue"
    ],
    moduleDirectories: ['node_modules', '<rootDir>/'],
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules/",
      "<rootDir>/build/",
      "<rootDir>/dist/"
    ],
    "transformIgnorePatterns": [
     
    ],
    "transform": {
      "^.+\\.js$": ['babel-jest', { presets: ['@babel/preset-env'] }],
      "^.+\\.ts$": ['babel-jest', { presets: ['@babel/preset-env'] }],
      "^.+\\.vue$": "@vue/vue3-jest",
      "^.+\\.svg$": "<rootDir>/svgTransform.cjs"
    },
    "roots": [
      "<rootDir>/src"
    ],
    "modulePaths": [
      "<rootDir>"
    ],
    "moduleNameMapper": {
      "^~(.*)$": "<rootDir>/src/$1",
      "^@/(.*)$": "<rootDir>/src/$1"
    },
    "coveragePathIgnorePatterns": [
      "/node_modules/"
    ]
  };