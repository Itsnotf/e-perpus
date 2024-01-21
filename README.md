# E-PERPUS

[![tailwind nextjs admin template](https://github.com/TailAdmin/free-nextjs-admin-dashboard/blob/main/tailadmin-nextjs.jpg)](https://nextjs-demo.tailadmin.com/)

## Template ENV 🌐

# Setup ⚙️

## Env Firebase Template 🔥

```
NEXT_PUBLIC_API_KEY=YOUR_KEY
NEXT_PUBLIC_AUTH_DOMAIN=YOUR_KEY
NEXT_PUBLIC_DATABASE_URL=YOUR_KEY
NEXT_PUBLIC_PROJECT_ID=YOUR_KEY
NEXT_PUBLIC_STORAGE_BUCKET=YOUR_KEY
NEXT_PUBLIC_MESSAGING_SENDER_ID=YOUR_KEY
NEXT_PUBLIC_APP_ID=YOUR_KEY
```

## Libraries Used 📚

- Framework: Next.js 13
- State Management: Zustand
- Storage: Firestore
- UI Framework: Tailwind CSS
- Auth: Firebase Auth

## Run the App 🚀

```
npm i
npm run dev
```

## Other Commands 🛠️

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## Adding Components ➕

1. Create a component in the `components` folder.
2. Create a file for the component in the appropriate folder.

## Creating New State Management 🔄

1. Create a new file `useState.ts` in the `hooks` folder.
2. Import and use Zustand with the following example code:

```typescript
// hooks/useState.ts
import { create } from 'zustand'

interface State {
  count: number
  inc: () => void
}

const useStore = create<State>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))

export default useStore
```

3. Use the new state management in a component, for example:

```typescript
// components/Counter.tsx
import React from 'react'
import useStore from '../hooks/useState'

function Counter() {
  const { count, inc } = useStore()

  return (
    <div>
      <span>{count}</span>
      <button onClick={inc}>one up</button>
    </div>
  )
}

export default Counter
```

## API Endpoints 🚀

1. **API/Peminjaman**

- **GET** `/api/peminjaman`
  - Description: Get borrowing data.
  - Usage:
    - Request Method: GET
    - Endpoint: `/api/peminjaman`
    - Example: `GET /api/peminjaman`
- **POST** `/api/peminjaman`

  - Description: Add return data for borrowing.
  - Usage:

    - Request Method: POST
    - Endpoint: `/api/peminjaman`
    - Body:
      - Format: JSON
      - Content: Data borrowing (PeminjamanBody)
    - Example:

      ```
      POST /api/peminjaman
      Content-Type: application/json

      {
        // Borrowing Data
      }
      ```

- **DELETE** `/api/peminjaman`

  - Description: Delete borrowing data based on ID.
  - Usage:

    - Request Method: DELETE
    - Endpoint: `/api/peminjaman`
    - Body:
      - Format: JSON
      - Content: { "idPeminjaman": "\<ID_Borrowing>" }
    - Example:

      ```
      DELETE /api/peminjaman
      Content-Type: application/json

      {
        "idPeminjaman": "<ID_Borrowing>"
      }
      ```

2. **API/Pengembalian**

- **GET** `/api/pengembalian`
  - Description: Get return data.
  - Usage:
    - Request Method: GET
    - Endpoint: `/api/pengembalian`
    - Example: `GET /api/pengembalian`
- **POST** `/api/pengembalian`

  - Description: Add return data for borrowing.
  - Usage:

    - Request Method: POST
    - Endpoint: `/api/pengembalian`
    - Body:
      - Format: JSON
      - Content: Data borrowing (PeminjamanBody)
    - Example:

      ```
      POST /api/pengembalian
      Content-Type: application/json

      {
        // Borrowing Data
      }
      ```

3. **API/Pengembalian/UpdateStatus**

- **GET** `/api/pengembalian/updateStatus`
  - Description: Get return data.
  - Usage:
    - Request Method: GET
    - Endpoint: `/api/pengembalian/updateStatus`
    - Example: `GET /api/pengembalian/updateStatus`
- **POST** `/api/pengembalian/updateStatus`

  - Description: Add return data for borrowing.
  - Usage:

    - Request Method: POST
    - Endpoint: `/api/pengembalian/updateStatus`
    - Body:
      - Format: JSON
      - Content: Data borrowing (PeminjamanBody)
    - Example:

      ```
      POST /api/pengembalian/updateStatus
      Content-Type: application/json

      {
        // Borrowing Data
      }
      ```

4. **API/Statistic**

- **GET** `/api/statistic`
  - Description: Get statistics related to members, returned books, books not yet returned, and fines.
  - Usage:
    - Request Method: GET
    - Endpoint: `/api/statistic`
    - Example: `GET /api/statistic`
