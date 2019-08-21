# TODO

1. Rename "glances" to "visits"? (What I've done is definitely visits because it doesn't include saccades) https://www.tobiipro.com/siteassets/tobii-pro/user-manuals/Tobii-Pro-Lab-User-Manual/?v=1.118

2. Create fixations after creating gazepoints

3. Create ability to run analyses on fixations instead of raw gazepoints (ISO 15007 and visits/glances are all supposed to be done on fixations, not gazepoints)

4. Display fixation statistics so that I can make inferences about the fixation filter algorithm settings (e.g. from SMI)

   - minimum fixation duration
   - maximum fixation duration
   - average fixation duration
   - fixation count

5. Provide the ability to set a minimum fixation duration, which allows you to filter out short fixations, even if the original fixation filter used a shorter minimum fixation duration.
