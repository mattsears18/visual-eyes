library(rstudioapi)
library(lmSupport)
library(ggplot2)
library(ggpmisc)

current_path = getActiveDocumentContext()$path 
setwd(dirname(current_path ))

analysis = read.csv(file = "lastAnalysisExport.csv", header=TRUE)
data = Filter(is.numeric, analysis)
data = data[, -c(1:3)] # delete columns 1 through 3

cors2 = cor(data)^2

xName = "Indirect.Work.."
yName = "Total.Time"

formula = y ~ x

ggplot(data, aes_string(x = xName, y = yName)) +
  geom_point() +
  geom_smooth(method = "lm", formula = formula, se = TRUE) +
  stat_poly_eq(aes(label =  paste(stat(eq.label), stat(rr.label), stat(adj.rr.label), sep = "~~~~")), 
               label.x.npc = "left", label.y.npc = 0.90,
               formula = formula, rr.digits = 3, coef.digits = 4, parse = TRUE, size = 4)+
  stat_fit_glance(method = 'lm',
                  method.args = list(formula = formula),
                  geom = 'text',
                  aes(label = paste("Slope P-value = ", signif(..p.value.., digits = 3), sep = "")),
                  label.x.npc = 'left', label.y.npc = 0.85, size = 4)


x = unlist(data[xName])
y = unlist(data[yName])

model = lm(y ~ x)
summary(model)

#plot(x, y)
#abline(model)
#legend("bottomright", bty="n", legend=paste("Adjusted R^2 = ", format(summary(model)$adj.r.squared, digits=4)))