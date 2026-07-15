# Project context

## Product

Flower Spectrum is a B2B wholesale flower portal for Ideal Cannabis. It gives licensed retail buyers a chemistry-first way to browse current lots and gives the seller a compact workspace for pricing access, inventory, and fulfillment.

## Audiences

- Approved retail buyer: sees tier pricing, requests delivery, reviews account history, and retrieves retail-ready assets.
- Guest buyer: can browse product data but cannot see pricing or submit an order.
- Seller: reviews incoming orders, advances fulfillment, updates live inventory, and approves wholesale access.

## Current scope

This repository is a polished, stateful product demo. Data is seeded locally and mutations persist in browser storage. It does not process payments, authenticate real users, upload files, or write to a production database.

## Production integration seams

- Replace `src/lib/data.ts` with repository functions backed by the chosen database.
- Replace the account-mode demo switch with authenticated roles and server-side authorization.
- Move order and access-request mutations to Server Actions or API route handlers.
- Store product photography in managed object storage and generate signed upload URLs.
- Add transactional email, audit history, license verification, and payment/terms workflows.

## Product safeguards

- Guest pricing is hidden in the UI; production must enforce this on the server as well.
- Simulated classifications are visibly marked and must not be published as verified chemistry.
- Copy avoids medical and effects claims.
- Demo checkout does not collect payment.
