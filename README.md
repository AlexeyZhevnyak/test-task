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
│   │   ├── FormTextArea.tsx   # Textarea with character counter
│   │   └── LanguageToggle.tsx # EN/AR language switcher
│   ├── features/              # Feature-specific components
│   │   ├── forms/
│   │   │   ├── PersonalInfoForm.tsx  # Step 1: Personal information
│   │   │   ├── FamilyInfoForm.tsx    # Step 2: Family & financial info
│   │   │   └── SituationForm.tsx     # Step 3: Situation descriptions with AI text buttons
│   │   ├── AiSuggestionDialog.tsx    # AI-powered form assistance modal
│   │   ├── AppFooter.tsx             # Footer with copyright
│   │   ├── AppHeader.tsx             # Header with title and language toggle
│   │   ├── FormStepper.tsx           # Step indicator (1/2/3)
│   │   ├── NavigationControls.tsx    # Back/Next/Submit buttons
│   │   └── SuccessCard.tsx           # Success page with reference number
│   ├── templates/             # Layout templates
│   │   ├── AppLayout.tsx            # Main layout wrapper
│   │   └── FormNavigationLayout.tsx # Form wizard layout
│   └── ProtectedRoute.tsx     # Route guard for form steps
├── hooks/                     # Custom React hooks
│   ├── useFormNavigation.ts   # Wizard navigation logic
│   ├── useLanguage.ts         # Language switching and RTL support
│   └── useAiSuggestion.ts     # AI suggestion with request cancellation
├── i18n/                      # Internationalization
│   ├── config.ts              # i18next configuration
│   └── locales/
│       ├── en.json            # English translations
│       └── ar.json            # Arabic translations (fully translated)
├── providers/
│   └── Providers.tsx          # Provider wrapper (Redux, Theme, i18n)
├── routing/
│   └── ApplicationRouter.tsx  # React Router configuration with protected routes
├── services/
│   └── api.ts                 # Axios client, API calls & AI integration
├── store/                     # Redux Toolkit state management
│   ├── index.ts               # Store configuration with localStorage middleware
│   ├── middlewares/
│   │   └── localStorageMiddleware.ts # Centralized localStorage persistence
│   └── slices/
│       ├── formDataSlice.ts         # Form field data (pure state logic)
│       ├── formValidationSlice.ts   # Validation state (pure state logic)
│       ├── languageSlice.ts         # Language preference (pure state logic)
│       └── aiSuggestionSlice.ts     # AI suggestion dialog state
├── types/
│   └── application.ts         # TypeScript interfaces (forms, enums, state)
├── utils/
│   └── storage.ts             # LocalStorage load/clear helpers
├── theme.ts                   # Material UI theme (RTL/LTR support)
├── App.tsx                    # Root component
└── main.tsx                   # Application entry point
```

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** 9+ or **yarn** 1.22+

### Installation

1 **Install dependencies**

   ```bash
   npm install
   ```

2 **Configure environment variables**

Update a `.env` file in the root directory:

   ```env
   VITE_API_KEY=your_api_key_here
   VITE_API_URL=your_api_url_here
   VITE_API_MODEL=your_model_here
   ```

**Important:**

- The API key must be prefixed with `VITE_` for Vite to expose it to the client

3 **Start development server**

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

- Current Financial Situation (1-2000 chars) **with AI assistance**
- Employment Circumstances (1-2000 chars) **with AI assistance**
- Reason for Applying (1-2000 chars) **with AI assistance**
- Real-time character counter (`{current}/{max} characters`)
- Animated AI icon buttons positioned in label row

### Success Page (`/success`)

- Reference number: `APP-{timestamp}-{random}`
- Next steps information
- Option to start new application

## AI Writing Assistant

The AI feature helps users write all three situation description fields with real AI integration.

### UI/UX Design

- **Animated Icon**: Sparkle icon with breathing animation (3s loop, scale 1.0→1.1, opacity 0.8→1.0)
- **Strategic Placement**: Icon button positioned next to field label in label row
- **Hover Interaction**: Animation pauses on hover to prevent distraction

### How It Works

1. User clicks animated **sparkle icon** button next to any situation description field
2. Dialog opens with loading spinner during real AI API call
3. AI generates contextual suggestion based on:
    - Field type (financial situation, employment, or application reason)
    - Current language (English/Arabic)
    - User's form data context
    - Configured AI model endpoint
4. User can:
    - **Accept** - Populate the field with AI-generated text
    - **Discard** - Close dialog and keep original text
5. **Request Cancellation**: If user closes modal during loading, pending API request is automatically cancelled

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
- **Text Areas**: 50-2000 character limits with real-time counter
- **Numbers**: Non-negative values for dependents and income
- **Required Fields**: All fields are mandatory
- **Character Counter**: Displays `{current}/{max} characters` in selected language

## Data Persistence

### LocalStorage Strategy

- **Centralized Middleware**: All localStorage operations handled by `localStorageMiddleware`
- **Form Data**: Auto-saved on every field change via Redux middleware
- **Language Preference**: Persists across sessions
- **Completed Steps**: Tracked and persisted for step validation
- **Survives**: Page refresh, browser restart
- **Error Handling**: Try-catch blocks prevent crashes from localStorage failures

### Storage Keys

```javascript
'application_form_data'  // Form data (personal, family, situation)
'application_completed_steps'         // Array of completed step numbers
'application_language'               // Current language preference ('en' or 'ar')
```

### Clearing Data

- **New Application**: Click "New Application" on success page
- **Manual**: Clear browser localStorage for the domain

## Architecture & Design Patterns

### State Management Architecture

- **Modular Redux Slices**: Separation of concerns with dedicated slices (pure state logic only)
    - `formDataSlice`: Pure data storage without localStorage calls
    - `formValidationSlice`: Validation logic and submission state
    - `languageSlice`: Language preference
    - `aiSuggestionSlice`: UI state for AI dialog
- **localStorage Middleware**: Centralized persistence layer
    - Intercepts Redux actions and syncs to localStorage
    - Monitors `formData/*`, `formValidation/*`, and `language/*` actions
    - Handles errors gracefully with try-catch blocks
    - Single source of truth for all persistence logic
- **Custom Hooks**: Business logic abstraction
    - `useFormNavigation`: Wizard navigation and validation
    - `useLanguage`: i18n and RTL/LTR switching
    - `useAiSuggestion`: AI API calls with AbortController for request cancellation

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
