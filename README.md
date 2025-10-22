# Government Social Support Portal

## Technology Stack

### Core Framework
- **React 19.2** - Latest React with concurrent features
- **TypeScript 5.9** - Type-safe development
- **Vite 7** - Next-generation build tool
- **Material-UI v7** - Modern React component library
- **Emotion** - CSS-in-JS styling solution
- **Redux Toolkit 2.9** - Modern Redux with simplified API
- **React Hook Form** - Performant form validation
- **@hookform/resolvers** - Validation schema integration
- **react-i18next** - React integration for i18next
- **Axios 1.12** - Promise-based HTTP client
- **React Router DOM 7** - Declarative routing

## Project Structure

```
src/
├── components/
│   ├── controls/              # Reusable form controls
│   │   ├── FormField.tsx      # Text input wrapper
│   │   ├── FormSelect.tsx     # Select dropdown wrapper
│   │   ├── FormDatePicker.tsx # Date picker wrapper
│   │   └── FormTextArea.tsx   # Textarea wrapper
│   ├── features/              # Feature-specific components
│   │   ├── forms/
│   │   │   ├── PersonalInfoForm.tsx      # Step 1: Personal info
│   │   │   ├── FamilyInfoForm.tsx        # Step 2: Family & financial
│   │   │   └── SituationForm.tsx         # Step 3: Situation description
│   │   ├── AppHeader.tsx                 # Application header
│   │   ├── AppFooter.tsx                 # Application footer
│   │   ├── FormStepper.tsx               # Progress indicator
│   │   ├── NavigationControls.tsx        # Next/Back/Submit buttons
│   │   ├── SuccessCard.tsx               # Success confirmation
│   │   ├── LanguageToggle.tsx            # EN/AR language switcher
│   │   └── AiSuggestionDialog.tsx        # AI suggestion popup
│   └── templates/             # Layout templates
│       ├── AppLayout.tsx                 # Main app layout
│       └── FormNavigationLayout.tsx      # Form wizard layout
├── hooks/                     # Custom React hooks
│   ├── useFormNavigation.ts   # Form wizard navigation logic
│   ├── useLanguage.ts         # Language switching logic
│   └── useAiSuggestion.ts     # AI suggestion state management
├── i18n/                      # Internationalization
│   ├── config.ts              # i18next configuration
│   └── locales/
│       ├── en.json            # English translations
│       └── ar.json            # Arabic translations
├── services/                  # API services
│   └── api.ts                 # HTTP client & API calls
├── store/                     # Redux store
│   ├── index.ts               # Store configuration
│   └── applicationSlice.ts    # Application state slice
├── types/                     # TypeScript definitions
│   └── application.ts         # Type definitions
├── utils/                     # Utility functions
│   ├── storage.ts             # localStorage helpers
│   └── validation.ts          # Custom validators
├── theme.ts                   # Material-UI theme config
├── App.tsx                    # Root component
└── main.tsx                   # Application entry point
```


## Getting Started

### Prerequisites
- **Node.js** 18+ (recommended: 20+)
- **npm** 9+ or **yarn** 1.22+

### Installation


1**Install dependencies**
   ```bash
   npm install
   ```

2**Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_OPEN_API_KEY=your_api_key_here
   ```

   **Important:**
   - The API key must be prefixed with `VITE_` for Vite to expose it to the client

3**Start development server**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:3000`

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Type-check and build for production
npm run build

# Preview production build locally
npm run preview
```

## Internationalization (i18n)

### Supported Languages
- **English (en)** - Default language
- **Arabic (ar)** - Full RTL support


## Form Steps

### Step 1: Personal Information (`/personal`)
- Full Name
- National ID (UAE format: 15 digits starting with 784)
- Date of Birth (18+ validation)
- Gender
- Address, City, State, Country
- Phone (UAE format: +971 X XXX XXXX)
- Email

### Step 2: Family & Financial Information (`/family`)
- Marital Status
- Number of Dependents (≥ 0)
- Employment Status
- Monthly Income (≥ 0)
- Housing Status

### Step 3: Situation Description (`/situation`)
- Current Financial Situation (50-2000 chars)
- Employment Circumstances (50-2000 chars)
- Reason for Applying (2000 chars) **with AI assistance**

### Success Page (`/success`)
- Reference number: `APP-{timestamp}-{random}`
- Next steps information
- Option to start new application

## AI Writing Assistant

The AI feature helps users write their "Reason for Applying" text.

### How It Works
1. User clicks **"Help Me Write"** button below the textarea
2. Dialog opens with loading spinner
3. AI generates suggestion based on language-specific prompt
4. User can:
   - **Accept** - Replace field content
   - **Edit** - Modify suggestion before accepting
   - **Discard** - Cancel and keep original text

## Validation Rules

### UAE-Specific Validation
- **National ID**: 15 digits starting with `784` (format: 784-YYYY-NNNNNNN-C)
- **Phone Numbers**:
  - Mobile: `+971 5X XXX XXXX` (50, 52, 54, 55, 56, 58)
  - Landline: `+971 X XXX XXXX` (2, 4, 6, 7, 9)
  - Also accepts local format: `050 XXX XXXX`

### General Validation
- **Email**: Standard RFC 5322 format
- **Age**: Must be 18+ years old
- **Text Areas**: 2000 character limits
- **Numbers**: Non-negative values for dependents and income
- **Required Fields**: All fields are mandatory

## Data Persistence

### LocalStorage Strategy
- **Form Data**: Auto-saved on every field change
- **Completed Steps**: Tracked separately
- **Language Preference**: Persists across sessions
- **Survives**: Page refresh, browser restart

### Storage Keys
```javascript
'applicationFormData'  // Personal, family, situation data
'completedSteps'       // Array of completed step indices
'language'             // Current language: 'en' | 'ar'
```

### Clearing Data
- **New Application**: Click "New Application" on success page
- **Manual**: Clear browser localStorage for the domain

## Theming & Styling

### Responsive Design
```
Mobile (375px)   - Single column layout
Tablet (768px)   - Two columns where appropriate
Desktop (1200px) - Optimized spacing and layout
```

## Build & Deployment

### Production Build
```bash
npm run build
```
Output: `dist/` directory

### Build Output
- `dist/index.html` - Entry HTML file
- `dist/assets/` - Bundled JS, CSS, and assets
- Optimized and minified
- Source maps included
