# Project context

## Product

Flower Spectrum is a B2B wholesale flower portal for Ideal Cannabis. It gives licensed retail buyers a chemistry-first way to browse current lots and gives the seller a compact workspace for pricing access, inventory, and fulfillment.

The public product surface includes a landing page, managed account creation and Google sign-in through Clerk, and guided onboarding for organization details, inventory sources, product photography, and lab documents.

## Audiences

- Approved retail buyer: sees tier pricing, requests delivery, reviews account history, and retrieves retail-ready assets.
- Guest buyer: can browse product data but cannot see pricing or submit an order.
- Seller: reviews incoming orders, advances fulfillment, updates live inventory, and approves wholesale access.

## Current scope

This repository is a polished, stateful product preview. Clerk authenticates real users when configured. Catalog data is seeded locally, onboarding metadata persists in browser storage, and selected files are staged in the browser. It does not process payments, persist uploaded binaries, or write product data to a production database.

## Production integration seams

- Replace `src/lib/data.ts` with repository functions backed by the chosen database.
- Promote the Clerk instance to production and configure production Google OAuth credentials.
- Map Clerk organizations and metadata to authenticated buyer/seller roles.
- Move order and access-request mutations to Server Actions or API route handlers.
- Store product photography in managed object storage and generate signed upload URLs.
- Persist onboarding data and file-to-lot relationships in the product database.
- Send stored lab-document references to the typed `ClassifierInput` contract when the Chemovar Classifier is available.
- Add transactional email, audit history, license verification, and payment/terms workflows.

## Product safeguards

- Guest pricing is hidden in the UI; production must enforce this on the server as well.
- Simulated classifications are visibly marked and must not be published as verified chemistry.
- Copy avoids medical and effects claims.
- Demo checkout does not collect payment.
