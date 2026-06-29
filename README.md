# Basic Land Tracker

A small local Flask app for visually tracking which Magic: The Gathering basic lands you own from each set.

It uses:

- **Scryfall bulk JSON** as the card/image catalogue.
- **A Moxfield-style CSV export** as the ownership overlay.
- **SQLite** for local storage.
- **Manual finish toggles** in the UI for cleanup and edge cases.

## What it tracks

By default the grid shows the five normal basic land names:

- Plains
- Island
- Swamp
- Mountain
- Forest

The app also imports Wastes and Snow-Covered basics. Use the `Include Wastes and snow basics` checkbox to show them.

Each printing appears once, with finish badges:

- `NF` = nonfoil
- `F` = foil
- `E` = etched

If you own any finish for that printing, the card image appears in colour. If you own none, it appears black-and-white.

## Setup

```bash
cd basic-land-tracker
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
flask --app app run --debug
```

Then open:

```text
http://127.0.0.1:5000
```

The SQLite database is created automatically at:

```text
data/basic_lands.sqlite3
```

## Import Scryfall data

Download Scryfall's Default Cards bulk JSON.

Then go to:

```text
/imports
```

You can either upload the JSON file or provide a local path such as:

```text
/Users/you/Downloads/default-cards.json
```

The importer can read:

- a normal Scryfall JSON array
- newline-delimited JSON
- `.gz` compressed input

The importer streams the file using `ijson`, so it should not need to load the whole Scryfall bulk file into memory.

## Import your collection

Go to:

```text
/imports
```

Upload a CSV collection export.

Best matching column:

```text
Scryfall ID
```

Fallback matching uses:

```text
Name + Set Code/Set Name + Collector Number
```

The importer tries to understand common column names, including:

- `Name`
- `Scryfall ID`
- `Set`, `Set Code`, `Edition`, `Set Name`
- `Collector Number`, `Number`
- `Quantity`, `Count`
- `Finish`, `Foil`, `Printing`, `Variant`

If a row cannot be matched to a Scryfall card in the local catalogue, it is skipped and counted as unmatched.

## Manual cleanup

Click a finish badge on any card to toggle ownership for that finish.

This is useful when:

- a collection export is missing finish data
- a card matched but the finish was wrong
- you want to track a few cards manually before importing a full collection

## Notes and limitations

- This app does not use live APIs during normal use.
- It does not currently import the ManaBox JSON format with `product_id` / `tcgplayer_sku_id`, because that format does not include enough card identity data by itself.
- Pricing is intentionally not included yet, but the database can be extended later.
- Scryfall image URLs are hotlinked rather than downloaded locally.

## Possible next improvements

- Add a ManaBox importer if the export includes Scryfall IDs or card names/set/collector numbers.
- Add cached local card images.
- Add price snapshots from Scryfall or TCGplayer.
- Add a completion page for each land type.
- Add export to CSV.
