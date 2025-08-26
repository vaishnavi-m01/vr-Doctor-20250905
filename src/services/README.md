# Participant Service

This service provides a complete interface for managing participants in the VR Doctor application, following the project's architectural standards.

## API Endpoint

The service connects to: `http://103.146.234.88:3007/api/participant-socio-demographics`

## Features

- ✅ **Fetch all participants** - Get complete list of participants
- ✅ **Filter participants** - By study ID, criteria status, group type, etc.
- ✅ **Search functionality** - Client-side search across participant fields
- ✅ **CRUD operations** - Create, read, update, delete participants
- ✅ **Error handling** - Comprehensive error handling and user feedback
- ✅ **Type safety** - Full TypeScript support with proper interfaces
- ✅ **React hooks** - Custom hooks for easy integration with components

## Usage

### Basic Usage

```typescript
import { participantService } from '../services/participantService';

// Fetch all participants
const response = await participantService.getAllParticipants();
console.log(response.data); // Array of participants
```

### With Filters

```typescript
// Get only included participants
const includedParticipants = await participantService.getIncludedParticipants();

// Get participants by study
const studyParticipants = await participantService.getParticipantsByStudy('CS-0001');

// Custom filters
const filteredParticipants = await participantService.getParticipants({
  criteriaStatus: 'Included',
  groupType: 'Trial'
});
```

### Using React Hook

```typescript
import { useParticipants } from '../hooks/useParticipants';

function ParticipantScreen() {
  const {
    participants,
    loading,
    error,
    total,
    fetchParticipants,
    refreshParticipants
  } = useParticipants();

  // The hook automatically fetches participants on mount
  // and provides loading states and error handling
}
```

### Using the Component

```typescript
import { ParticipantList } from '../components/ParticipantList';

function ParticipantScreen() {
  const handleParticipantSelect = (participant) => {
    console.log('Selected:', participant);
  };

  return (
    <ParticipantList
      onParticipantSelect={handleParticipantSelect}
      showFilters={true}
      initialFilters={{ criteriaStatus: 'Included' }}
    />
  );
}
```

## Data Structure

Each participant contains the following fields:

- `ParticipantId` - Unique identifier
- `MRNumber` - Medical record number
- `Age` - Participant age
- `Gender` - Participant gender
- `MaritalStatus` - Marital status
- `NumberOfChildren` - Number of children
- `EducationLevel` - Education level
- `EmploymentStatus` - Employment status
- `KnowledgeIn` - Languages known
- `PracticeAnyReligion` - Religious practice
- `FaithContributeToWellBeing` - Faith contribution to well-being
- `CriteriaStatus` - Inclusion/exclusion status
- `GroupType` - Study group type
- `PhoneNumber` - Contact number
- `StudyId` - Associated study ID
- `Status` - Active/inactive status
- `CreatedBy` - Creator user ID
- `CreatedDate` - Creation timestamp
- `ModifiedBy` - Last modifier user ID
- `ModifiedDate` - Last modification timestamp

## Error Handling

The service provides comprehensive error handling:

```typescript
try {
  const participants = await participantService.getAllParticipants();
  // Handle success
} catch (error) {
  if (error.status === 404) {
    // Handle not found
  } else if (error.status === 500) {
    // Handle server error
  } else {
    // Handle other errors
  }
}
```

## Testing

Run tests with:

```bash
npm test src/services/__tests__/participantService.test.ts
```

## Architecture

The service follows the project's layered architecture:

1. **API Layer** (`api.ts`) - Base HTTP client with common methods
2. **Service Layer** (`participantService.ts`) - Business logic and API calls
3. **Hook Layer** (`useParticipants.ts`) - React state management
4. **Component Layer** (`ParticipantList.tsx`) - UI presentation
5. **Configuration** (`environment.ts`) - Centralized API configuration

## Configuration

API settings are configured in `src/config/environment.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://103.146.234.88:3007',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const;
```

## Best Practices

- Always use the service through the provided interfaces
- Handle loading and error states in your components
- Use the React hook for automatic state management
- Implement proper error boundaries in your app
- Test API calls with the provided test suite
