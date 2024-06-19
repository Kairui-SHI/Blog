---
title: 利用SVD求解对应点集变换矩阵
published: 2024-06-10
description: "自学习用"
# image: "./saya.jpg"
tags: ["Transformation", "SLAM", "Photogrammetry"]
category: Techniques
draft: False
---

## 单组点的方位矩阵的计算与点云匹配的区别
我们知道，一个点的方位可由下式表示:  
$$
\begin{bmatrix}
R  & T \\ 
0  & 1
\end{bmatrix} \tag{1}
$$
想要由$P_i \rightarrow Q_i$，即求解：  
$$
\begin{align}
\begin{bmatrix}
R  & T \\ 
0  & 1
\end{bmatrix}
\cdot P_i = Q_i  \tag{2}
\end{align}
$$
如果只是想求解单个点对的方位矩阵的变换可以直接用矩阵求逆的方法求出变换矩阵R，例如用一些[metric(eg.APE, ATE, RPE, RTE)](https://zhaoxuhui.top/blog/2021/05/14/APE-RPE-ATE-RTE-Mmetric-in-SLAM.html)去衡量模型匹配效果的时候。     
**请注意，这与后面的点云匹配计算点云RT不一样，此处每一个点都有一个矩阵表示其位姿，而点云中的点只代表其在空间中的坐标。**       


## 自ICP算法瞥见RT求解方法
通过ICP算法等经典算法问题了解到，求解对应空间点集的RT矩阵即求解方位矩阵P($R_1$与$T_1$组成)到对应点方位矩阵Q的旋转$R$,平移$T$变换。    
如同ICP算法，只需计算矩阵P经过RT变换之后，与矩阵Q的差值就能衡量匹配标准。         
**1.固定R对T求导并令其等于0，可得平移矩阵是平移后点云重心化之差**     
$$
\begin{align}
t = \overline{q}-R\overline{p} \tag{3}
\end{align}
$$
因此可以在求解R时提前用去重心化(名字各式各样，理解万岁)的方法消除平移变量的影响。    
$$
\begin{align}
\min \sum_{i}^{N} (Rp_i'-q_i')^2 \tag{4}
\end{align}
$$
**2.于是在求解R时就变为了一个较为简单的最小二乘法求解问题**      
$$
\begin{align}
\max tr(Q'^TRP') \tag{5}
\end{align}
$$
由于本文旨在理解、学习与记录，不放出全部推断过程，详细推导过程可参考[source](https://vincentqin.tech/posts/slam-common-issues-ICP/)文章学习。      
**3.利用trace的特性求解R**   
在各个维度权重W相等时(本篇上述均忽视了维度权重问题，可在实际处理问题时左乘对角矩阵W(n*n))，可化为    
$$
trace(RP'Q'^T) \tag{6}
$$
我们已知两个矩阵的covariance即为$P'Q'^T$，且由奇异值分解SVD可知$S=U\Sigma V^T$，因此    
$$
\begin{array}{c}
Cov= U\Sigma V^T \\ 
P'(W)EQ'^T = Cov\\ \Longrightarrow \\
trace(RP'(W)Q'^T) = trace(R(Cov)) = trace(RU\Sigma V^T) \\
= trace(\Sigma V^TRU) = \Sigma\cdot trace(V^TRU) \tag{7}
\end{array}
$$
此处运用了trace的特性$tr(AB)=tr(BA)$。同时，当正交矩阵($V^T, R, U$均为正交矩阵)的迹最大时，每个方向上的$X_i^TX_i=1$,即该方向上的所有值的平方和等于1($\sum x_{ij}^2=1$)，而trace又只取对角线上的元素$x_{ii}$，因此对角线上每个值最大取1时trace有最大值。所以有    
$$
\begin{array}{c}
V^TRU = E \\\Longrightarrow R= VU^T \tag{8}
\end{array}
$$
而V, U均可用PQ的covariance用SVD求得，就可以求出旋转矩阵R了。  
至此，再代回T的式子，R与T均可求出。   

> 参考文章：    
> [求解ICP，利用SVD分解得到旋转矩阵](https://vincentqin.tech/posts/slam-common-issues-ICP/)   
> [SLAM中的位姿与轨迹评价指标:APE、RPE、ATE、RTE](https://zhaoxuhui.top/blog/2021/05/14/APE-RPE-ATE-RTE-Mmetric-in-SLAM.html)    
> This is my github link: [Source](https://github.com/Kairui-SHI)   
