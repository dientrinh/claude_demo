# Demo claude
Demo claude
claude mcp add --scope user teamdocs -- python /path/server.py
claude mcp add --scope user teamdocs -- uv run --with mcp python /path/server.py

Issues and fixes summary
#	Issue	Cause	Fix
1	pip: command not found	pip not on PATH	python -m pip install mcp (or use a venv / uv)
2	GITHUB_TOKEN not seen by Claude Code	Env var only lives in the shell where it was set	export GITHUB_TOKEN=ghp_xxx then run claude from the same Git Bash window. For permanent: setx GITHUB_TOKEN "ghp_xxx" and reopen the terminal
3	teamdocs showed ✗, CONNECTION_CLOSED	mcp 2.x renamed FastMCP, so the server crashed on import	python -m pip install "mcp<2"
4	Refund answer was thin, plus Unknown resource: catalog://docs/refunds.md	Placeholder doc text, and the server only exposed catalog://docs, not a per-doc resource	Use realistic DOCS content and add @mcp.resource("catalog://docs/{name}

## Diagnostic commands that found the problems
claude mcp get teamdocs                 # showed "Failed to connect: CONNECTION_CLOSED"
python -c "import mcp; print('ok')"     # confirmed mcp was installed
python path/to/server.py                # revealed the real traceback (FastMCP rename)
echo $GITHUB_TOKEN                      # verifies the token is set

## Final working setup
# Install compatible SDK
python -m pip install "mcp<2"

# Register personal server (user scope -> ~/.claude.json)
claude mcp add --scope user teamdocs -- python /path/server.py

# Project server lives in .mcp.json with "Bearer ${GITHUB_TOKEN}"
export GITHUB_TOKEN=ghp_xxx
claude