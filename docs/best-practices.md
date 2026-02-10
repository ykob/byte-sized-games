# Development Best Practices

This document outlines the idiomatic coding patterns and quality standards required for this project.  
We prioritize code that is "easy to delete" and "easy to read" over complex, dry, or clever implementations.  
These practices serve as a guide for both daily development and the code review process.

## Early Return (Guard Clauses)

Use early `return` or `throw` statements to handle edge cases, invalid inputs, or error conditions at the beginning of a function. This pattern is often referred to as a "Guard Clause."

- Reduced Nesting: Keeps the code structure flat and prevents the "Arrow Anti-pattern" (excessive indentation).
- Improved Readability: By handling exceptions first, the reader can focus on the core business logic without keeping track of multiple conditional layers.
- Clear "Happy Path": The main, successful flow of the function (the "Happy Path") is clearly visible at the end of the function, rather than buried inside nested blocks.
- Lower Cognitive Load: Developers can "forget" about the edge cases once they have been returned, making the rest of the function easier to reason about.
