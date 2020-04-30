library(lolcat)

l120 = read.csv("/Volumes/GoogleDrive/My Drive/PhD/Papers Proposals and Projects/Dissertation/ALL data exports and analysis results/0 Pipe Spool Assembly Task/5 Results/VisitsWithLeadingSaccades120MFD.csv")
t120 = read.csv("/Volumes/GoogleDrive/My Drive/PhD/Papers Proposals and Projects/Dissertation/ALL data exports and analysis results/0 Pipe Spool Assembly Task/5 Results/VisitsWithTrailingSaccades120MFD.csv")

l100 = read.csv("/Volumes/GoogleDrive/My Drive/PhD/Papers Proposals and Projects/Dissertation/ALL data exports and analysis results/0 Pipe Spool Assembly Task/5 Results/VisitsWithLeadingSaccades100MFD.csv")
t100 = read.csv("/Volumes/GoogleDrive/My Drive/PhD/Papers Proposals and Projects/Dissertation/ALL data exports and analysis results/0 Pipe Spool Assembly Task/5 Results/VisitsWithTrailingSaccades100MFD.csv")

l60 = read.csv("/Volumes/GoogleDrive/My Drive/PhD/Papers Proposals and Projects/Dissertation/ALL data exports and analysis results/0 Pipe Spool Assembly Task/5 Results/VisitsWithLeadingSaccades60MFD.csv")
t60 = read.csv("/Volumes/GoogleDrive/My Drive/PhD/Papers Proposals and Projects/Dissertation/ALL data exports and analysis results/0 Pipe Spool Assembly Task/5 Results/VisitsWithTrailingSaccades60MFD.csv")

l50 = read.csv("/Volumes/GoogleDrive/My Drive/PhD/Papers Proposals and Projects/Dissertation/ALL data exports and analysis results/0 Pipe Spool Assembly Task/5 Results/VisitsWithLeadingSaccades50MFD.csv")
t50 = read.csv("/Volumes/GoogleDrive/My Drive/PhD/Papers Proposals and Projects/Dissertation/ALL data exports and analysis results/0 Pipe Spool Assembly Task/5 Results/VisitsWithTrailingSaccades50MFD.csv")

l0 = read.csv("/Volumes/GoogleDrive/My Drive/PhD/Papers Proposals and Projects/Dissertation/ALL data exports and analysis results/0 Pipe Spool Assembly Task/5 Results/VisitsWithLeadingSaccades0MFD.csv")
t0 = read.csv("/Volumes/GoogleDrive/My Drive/PhD/Papers Proposals and Projects/Dissertation/ALL data exports and analysis results/0 Pipe Spool Assembly Task/5 Results/VisitsWithTrailingSaccades0MFD.csv")
  

t.test(l120$leadingEventDuration, t120$trailingEventDuration)
t.test(l100$leadingEventDuration, t100$trailingEventDuration)
t.test(l60$leadingEventDuration, t60$trailingEventDuration)
t.test(l50$leadingEventDuration, t50$trailingEventDuration)
t.test(l0$leadingEventDuration, t0$trailingEventDuration)

