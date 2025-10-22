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
│   │   ├── FormDatePicker.tsx # Date picker with validation
│   │   ├── FormField.tsx      # Text input wrapper
│   │   ├── FormSelect.tsx     # Select dropdown wrapper
│   │   ├── FormTextArea.tsx   # Textarea wrapper
│   │   └── LanguageToggle.tsx # EN/AR language switcher
│   ├── features/              # Feature-specific components
│   │   ├── forms/
│   │   │   ├── PersonalInfoForm.tsx  # Step 1: Personal information
│   │   │   ├── FamilyInfoForm.tsx    # Step 2: Family & financial info
│   │   │   └── SituationForm.tsx     # Step 3: Situation descriptions
│   │   ├── AiSuggestionDialog.tsx    # AI-powered form assistance modal
│   │   ├── AppFooter.tsx             # Footer with copyright
│   │   ├── AppHeader.tsx             # Header with title and language toggle
│   │   ├── FormStepper.tsx           # Step indicator (1/2/3)
│   │   ├── NavigationControls.tsx    # Back/Next/Submit buttons
│   │   └── SuccessCard.tsx           # Success page with reference number
│   ├── templates/              # Layout templates
│   │   ├── AppLayout.tsx            # Main layout wrapper
│   │   └── FormNavigationLayout.tsx # Form wizard layout
│   └── ProtectedRoute.tsx      # Route guard for form steps
├── hooks/                      # Custom React hooks
│   ├── useFormNavigation.ts    # Wizard navigation logic
│   ├── useLanguage.ts          # Language switching and RTL support
│   └── useAiSuggestion.ts      # AI suggestion feature logic
├── i18n/                       # Internationalization
│   ├── config.ts               # i18next configuration
│   └── locales/
│       ├── en.json             # English translations
│       └── ar.json             # Arabic translations
├── services/
│   └── api.ts                  # Axios client and API calls
├── store/                      # Redux Toolkit state management
│   ├── index.ts                # Store configuration with persistence middleware
│   └── slices/
│       ├── formDataSlice.ts         # Form field data across all steps
│       ├── formValidationSlice.ts   # Validation state and completed steps
│       ├── languageSlice.ts         # Current language preference
│       └── aiSuggestionSlice.ts     # AI suggestion dialog state
├── types/
│   └── application.ts          # TypeScript interfaces (forms, enums, state)
├── utils/
│   └── storage.ts              # LocalStorage helpers
├── theme.ts                    # Material UI theme (RTL/LTR support)
├── App.tsx                     # Root component with routing
└── main.tsx                    # Application entry point
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
- Current Financial Situation (50-1000 chars) **with AI assistance**
- Employment Circumstances (50-1000 chars) **with AI assistance**
- Reason for Applying (50-1000 chars) **with AI assistance**

### Success Page (`/success`)
- Reference number: `APP-{timestamp}-{random}`
- Next steps information
- Option to start new application

## AI Writing Assistant

The AI feature helps users write all three situation description fields.

### How It Works
1. User clicks **lightbulb icon** button next to any situation description field
2. Dialog opens with loading spinner (simulates 2-second API call)
3. AI generates contextual suggestion based on:
   - Field type (financial situation, employment, or application reason)
   - Current language (English/Arabic)
   - User's form data context
4. User can:
   - **Use This Text** - Accept and populate the field
   - **Cancel** - Discard and keep original text

### Implementation Details
- **Component**: `AiSuggestionDialog.tsx` at /home/user/WebstormProjects/test-task/src/components/features/AiSuggestionDialog.tsx:1
- **Hook**: `useAiSuggestion.ts` manages dialog state and generation logic
- **Redux Slice**: `aiSuggestionSlice.ts` tracks visibility and loading state
- **Mock Generation**: Currently simulates AI with realistic delays; ready for real API integration

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
- **Text Areas**: 50-1000 character limits (min 50, max 1000)
- **Numbers**: Non-negative values for dependents and income
- **Required Fields**: All fields are mandatory

## Data Persistence

### LocalStorage Strategy
- **Form Data**: Auto-saved on every field change via Redux middleware
- **Language Preference**: Persists across sessions
- **Survives**: Page refresh, browser restart

### Redux Store Structure
The application uses **Redux Toolkit** with modular slices:

```typescript
// formDataSlice - Form field data
{
  personalInfo: { name, nationalId, dateOfBirth, gender, ... },
  familyInfo: { maritalStatus, dependents, employmentStatus, ... },
  situationInfo: { financialSituation, employmentCircumstances, ... }
}

// formValidationSlice - Validation and submission state
{
  isStepValid: boolean,
  completedSteps: number[],
  isSubmitting: boolean,
  isSubmitted: boolean,
  error: string | null
}

// languageSlice - Language preference
{
  currentLanguage: 'en' | 'ar'
}

// aiSuggestionSlice - AI dialog state
{
  isOpen: boolean,
  isLoading: boolean
}
```

### Storage Keys
```javascript
'persist:root'  // Redux persist key containing all slices
```

### Clearing Data
- **New Application**: Click "New Application" on success page
- **Manual**: Clear browser localStorage for the domain

## Architecture & Design Patterns

### State Management Architecture
- **Modular Redux Slices**: Separation of concerns with dedicated slices
  - `formDataSlice`: Pure data storage
  - `formValidationSlice`: Validation logic and submission state
  - `languageSlice`: Language preference
  - `aiSuggestionSlice`: UI state for AI dialog
- **Redux Persist**: Automatic LocalStorage synchronization
- **Custom Hooks**: Business logic abstraction (`useFormNavigation`, `useLanguage`, `useAiSuggestion`)

### Form Navigation Pattern
- **Protected Routes**: Prevents direct access to incomplete steps
- **Browser History Override**: Uses `{replace: true}` to disable back/forward navigation
- **Step Validation**: Each step validates before allowing progression
- **Completed Steps Tracking**: Visual indicators for finished steps

### Component Organization
```
controls/    → Reusable, generic form inputs (wrapper components)
features/    → Business-specific components (form steps, dialogs)
templates/   → Layout and page structure components
```

## Theming & Styling

### RTL/LTR Support
- **Dynamic Theme**: Theme recreated on language change
- **Direction Toggle**: Automatic `dir="rtl"` or `dir="ltr"` on document
- **Font Switching**: Roboto (English) / Cairo (Arabic)
- **Layout Mirroring**: All spacing, margins, and alignments flip for RTL

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
