# Redux Filter State Migration Guide

## Overview
This guide helps migrate from using `RequestContext` to Redux for managing filter state (divisions, month, year).

## What Changed

### Before (RequestContext)
```javascript
// In components
const { request, updateRequest } = useRequest();

// Filter updates scattered across components
setSelected(divisions); // local state
setMonth(month); // local state
```

### After (Redux)
```javascript
// In components
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDivisions, setSelectedMonth, setSelectedYear } from '../reducers/uiFiltersReducer';

const dispatch = useDispatch();
const { selectedDivisions, selectedMonth, selectedYear } = useSelector(state => state.uiFilters);

// Centralized filter updates
dispatch(setSelectedDivisions(divisions));
dispatch(setSelectedMonth(month));
```

## Step-by-Step Migration

### 1. Replace Imports in Components

**Old:**
```javascript
import { useRequest } from '../common/RequestContext';
```

**New:**
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { 
  setSelectedDivisions, 
  setSelectedMonth, 
  setSelectedYear 
} from '../reducers/uiFiltersReducer';
```

### 2. Update Component State Access

**Old:**
```javascript
const { request } = useRequest();

useEffect(() => {
  if (request) {
    fetchApi(url, request); // request = { div, month, year, ... }
  }
}, [request]);
```

**New:**
```javascript
const { selectedDivisions, selectedMonth, selectedYear } = useSelector(
  state => state.uiFilters
);

useEffect(() => {
  fetchApi(url, {
    div: selectedDivisions.map(d => d.value),
    month: selectedMonth,
    year: selectedYear,
  });
}, [selectedDivisions, selectedMonth, selectedYear]);
```

### 3. Update Filter Change Handlers

**Old:**
```javascript
const handleDivisionChange = (selectedColumns) => {
  setSelected(selectedColumns);
  updateRequest({ div: selectedColumns });
};
```

**New:**
```javascript
const handleDivisionChange = (selectedColumns) => {
  dispatch(setSelectedDivisions(selectedColumns));
};

const handleMonthChange = (event) => {
  dispatch(setSelectedMonth(event.target.value));
};

const handleYearChange = (event) => {
  dispatch(setSelectedYear(event.target.value));
};
```

### 4. Remove RequestContext Provider (in MainLayout)

**Old:**
```javascript
import { RequestProvider } from '../common/RequestContext';

function MainLayout() {
  return (
    <RequestProvider>
      <Navbar />
      <div className="main-content-wrapper">
        <Outlet />
      </div>
    </RequestProvider>
  );
}
```

**New:**
```javascript
// Redux Provider is already at App level via store setup
function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="main-content-wrapper">
        <Outlet />
      </div>
    </>
  );
}
```

## Redux Selectors Helper

Create a custom hook for easier access (optional but recommended):

```javascript
// src/app/hooks/useFilters.js
import { useDispatch, useSelector } from 'react-redux';
import { 
  setSelectedDivisions, 
  setSelectedMonth, 
  setSelectedYear,
  resetFilters 
} from '../reducers/uiFiltersReducer';

export const useFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.uiFilters);

  return {
    ...filters,
    setDivisions: (divisions) => dispatch(setSelectedDivisions(divisions)),
    setMonth: (month) => dispatch(setSelectedMonth(month)),
    setYear: (year) => dispatch(setSelectedYear(year)),
    reset: () => dispatch(resetFilters()),
  };
};

// Usage in component:
const { selectedDivisions, setDivisions } = useFilters();
```

## Benefits of This Change

| Aspect | RequestContext | Redux |
|--------|---|---|
| **Debugging** | Hard to track state changes | Redux DevTools integration |
| **Persistence** | No built-in support | redux-persist handles it |
| **Testing** | Harder to mock | Easy to test with mock store |
| **Scalability** | Complex for large state | Designed for scale |
| **DevTools** | None | Full Redux DevTools support |
| **Type Safety** | N/A | Works well with TypeScript |

## Files to Update

1. ✅ `src/reducers/uiFiltersReducer.js` - Already created
2. ✅ `src/reducers/rootReducer.js` - Already updated
3. ⏳ `src/app/core/Navbar.jsx` - Update handlers
4. ⏳ `src/app/core/Dashboard.jsx` - Update selectors
5. ⏳ All report components - Update to use Redux filters instead of RequestContext
6. ⏳ `src/app/core/MainLayout.jsx` - Remove RequestProvider wrapper

## Example: Full Component Conversion

### Dashboard.jsx Before
```javascript
import { useRequest } from '../common/RequestContext';

const Dashboard = () => {
  const { request } = useRequest();
  const [scData, setscData] = useState([]);

  useEffect(() => {
    if (request) {
      const response = await fetchApi(apiUrls.SalesScData, request);
      setscData(response.data);
    }
  }, [request]);

  return <div>...</div>;
};
```

### Dashboard.jsx After
```javascript
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { selectedDivisions, selectedMonth, selectedYear } = useSelector(
    state => state.uiFilters
  );
  const [scData, setscData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetchApi(apiUrls.SalesScData, {
        div: selectedDivisions.map(d => d.value),
        month: selectedMonth,
        year: selectedYear,
      });
      setscData(response.data);
    })();
  }, [selectedDivisions, selectedMonth, selectedYear]);

  return <div>...</div>;
};
```

## LocalStorage Persistence

Redux-persist already handles this! The `uiFilters` state will be automatically persisted and restored.

If you want to exclude certain fields from persistence, update `store.js`:

```javascript
const persistConfig = {
  key: 'root',
  storage,
  // Exclude uiFilters from persistence (optional)
  // blacklist: ['uiFilters']
};
```

## Debugging with Redux DevTools

1. Install [Redux DevTools Browser Extension](https://github.com/reduxjs/redux-devtools-extension)
2. Open DevTools → Redux panel
3. See all dispatched actions and state changes in real-time
4. Time-travel debug through your filter changes

## Still Using RequestContext?

The `RequestContext` can be removed once all components are migrated. It was a temporary solution while state management was being refactored.
