# TODO

1. Create fixations after creating gazepoints

2. Create ability to run analyses on fixations instead of raw gazepoints (ISO 15007 and visits/glances are all supposed to be done on fixations, not gazepoints)

3. Display fixation statistics so that I can make inferences about the fixation filter algorithm settings (e.g. from SMI)

   - minimum fixation duration
   - maximum fixation duration
   - average fixation duration
   - fixation count

4. Provide the ability to set a minimum fixation duration, which allows you to filter out short fixations, even if the original fixation filter used a shorter minimum fixation duration.

5. Change all Chai expect().to.throw() checks to use regular expressions instead of text strings. As-is, the text strings are used as regular expressions, so they match too many possible errors https://www.chaijs.com/api/bdd/#method_throw
