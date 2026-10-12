from mcp.server.fastmcp import FastMCP
mcp = FastMCP("teamdocs")

DOCS = {"refunds.md": "Refund policy...", "shipping.md": "Shipping SLAs..."}

@mcp.tool()
def search_docs(query: str) -> str:
    """Search the team's internal policy docs by keyword. Returns matching
    filenames with a 2-line snippet and last-updated date. Use this instead of
    Grep for policy questions: it covers docs that are NOT in the repo."""
    return "\n".join(f"{k}: {v[:40]}" for k, v in DOCS.items() if query.lower() in v.lower())

@mcp.resource("catalog://docs")
def catalog() -> str:
    """Index of all available docs with one-line summaries."""
    return "\n".join(f"- {k}: {v[:30]}" for k, v in DOCS.items())

mcp.run()