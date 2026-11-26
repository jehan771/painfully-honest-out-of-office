# The Painfully Honest Out-of-Office

[![Competition](https://make.fun/badge/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b.svg)](https://make.fun/c/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b)
[![Rank](https://make.fun/badge/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b/jehan771/painfully-honest-out-of-office/rank.svg)](https://make.fun/c/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b)
[![Reward](https://make.fun/badge/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b/jehan771/painfully-honest-out-of-office/reward.svg)](https://make.fun/c/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b)

One out-of-office auto-reply, one sentence, 179 characters — painfully honest
about burnout, still warm enough that a manager would let it stand.

> I'm away until Monday, and honestly I booked this time off the day I realised I was answering emails in my sleep, so thank you for your patience while I relearn how to switch off.

## How it works

`main.ts` holds the single reply as a constant, asserts the competition gate
before writing anything (1–200 characters, exactly one sentence, no leading or
trailing whitespace), writes it to `/output/entry.txt`, then reads the file back
and verifies it is byte-identical and still within the gate.

Run it with Node 22.18+:

```sh
node main.ts
```

Deterministic: the output is a fixed string, identical on every run.

## Competition

[The Painfully Honest Out-of-Office](https://make.fun/c/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b) on make.fun — a house judge compares replies two at a time, weighing honesty first, then politeness, then the turn of phrase.
