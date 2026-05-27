# IDaD Project Website

## Overview
This project is a modern web application built as part of COS30043 – Interface Design and Development.
It demonstrates a full-stack system with interactive UI, persistent data storage, and user-based functionality.

The application will allow users to browse, search and interact with content and additional features available to authenticated users of the website

## Setup
To run the website on your device, open the terminal where the project resides in and run this line of code:
```bash
npm run dev
```

## Tech
Frontend:
    Vue.js 3 (Vite-based setup)
    Bootstrap (responsive layout using grid system)
    Vue Router (page navigation)
Backend
    RESTful API (e.g. Node.js / Express / other)
    Database (e.g. MongoDB / MySQL / Firebase)
Tools
    Git (version control)
    GitHub (repository hosting)
    Trello / Jira (task tracking)

## Coding and Style

Component-based architecture following Vue's best practises 

Naming conventions:
    Components: PascalCase
    Variables/functions: camelCase

## Organisation
Files are organised according to Vue best practices, grouping components, views, and services by responsibility.

src/

    │── components/        # Reusable Vue components
    │── views/             # Page-level components
    │── router/            # Vue Router configuration
    │── services/          # API calls
    │── assets/            # Static assets
    │── tests/             # For unit testing
    
## Git

### Usage

**Branches**

Team members should all be working on separate branches as to not complicate things, with `dev` as a common place to merge changes (and `main` for releases). Branches can be whatever you want, personal branches (e.g. `remy-branch`) or feature branches (e.g. `player-movement`) are fine.


If using feature branches, make sure to delete branches when they're not going to be used anymore as to not pollute the list.

As a general rule
main → stable release
dev → integration branch
feature branches for development

**Merging to Dev**

When you've finished a task (or just want/need to share changes), do the following:
- Merge `dev` into your working branch.
- Test, make sure you haven't introduced bugs in the merge, or in any obvious places.
- Ideally, notify the channel that you are merging your branch in dev
- Merge your working branch into `dev`.
- If you've finished a task (or just want to), post something in `#feature-showcase` explaining what you've done.
    - This is not only about sharing and task tracking, but also allows others to more easily understand what is present on `dev`, making it less likely someone is blind-sided by changes when merging.

Generally, you are responsible for making sure your changes haven't broken anything in the main project when merging to `dev`, this includes breaking changes. If your code breaks something in the main project you should not merge unless you have a good reason to (e.g. the feature is blocking stuff and it's more important to have it now than have everything work).

Tertiary things like tests can be broken if you wish, although if you break a commonly used test scene you may want to fix it or create another to use and alert others to it.

**Updating Main**

Main shouldn't be used often or by most team members. It is for use as a 'stable' branch to release milestone builds to. Stuff on main should only ever be fast-forwarded from `dev` (it is `dev` at the latest stable commit).

Branches shouldn't be created off of `main` as it will rarely be up to date.

**Merging to Other Branches**

If you want to merge to branches other than `dev`, you should have the permission of the person currently working on that branch.

**Reversions/Amendments**

Reverting or amending should only be done in safe/sandboxed environments as to not mess with other people's git history or brick the project.

In general, never force push to `dev` or `main` unless you know what you are doing. Force pushing `dev` or `main` should only be done to fix issues with git and should ideally not be done at all.

On your own branch you can do whatever you want but beware that messing with commits that are present on `dev` might cause problems when merging.

### Commit Style

Commits should be formatted according to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. Basically the commit title describes the one thing you have done of a type (usually feat or fix), with an exclamation mark and footer for breaking changes, and an optional scope (what part of the project the thing is relevant to).

Example:
    
    feat(auth): add user login system
    Implemented login form with validation and connected it to backend API.


## FAQ
~ "I have merged the dev into my branch and now nothing is displaying, what happened?"":
Make a .env file int the project, copy and paste below the lines inside and it should work, if this does not work put a message into the discord to investigate further.
VITE_SUPABASE_URL=https://vqmdlxhwweeebiccxuug.supabase.co/
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_JMuKTZZ-q8_A1vNVULYnhQ_cA6QXuqD


