---
paths:
  - "docs/**/payments*"
  - "docs/diagrams/**/cde*"
  - "docs/decisions/**/*pci*"
---
# PCI DSS scope rules (design)
- Model the cardholder data environment (CDE) as a distinct boundary on every diagram.
- Cardholder data designs must specify CMEK from the pci-keyring only.
- Show all network paths into the CDE passing through the PCI perimeter.
- Never include PAN, CVV, or track data in examples. Use masked values such as ************1234.