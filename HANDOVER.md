# Handover

The client owns and pays for everything below in their own name. Tick a line only with a date, a name and evidence.

- [ ] own-project | | |
- [ ] own-hosting | | |
- [ ] backups-on | | |
- [ ] restore-tested | | |
- [ ] two-factor | | |
- [ ] keys-rotated | | |
- [ ] bb-access-listed | | |

What each line means:

own-project: the code repository sits in an account the client owns. BB is a collaborator, not the owner.

own-hosting: the host account that serves the site and the domain are in the client's name and paid by the client.

backups-on: the repository and any content the site depends on are copied somewhere the client controls.

restore-tested: someone rebuilt the site from the backup on a clean machine and saw it load.

two-factor: two-factor sign-in is on for every account that can change the code, the host or the domain.

keys-rotated: any key or password BB saw during the build has been changed by the client after handover.

bb-access-listed: every place BB still has access is written down, with who and why, so the client can remove it.

A ticked line looks like this:

- [x] id | YYYY-MM-DD | who | evidence
