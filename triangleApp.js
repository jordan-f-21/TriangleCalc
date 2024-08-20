var values = ["", "", "", "", "", ""];

function checkInput(x) {
    var display = document.getElementById('p' + x);
    var inputValue = document.getElementById('input' + x).value;
    var label = ["a", "b", "c", "α", "β", "γ"][x];
    var suffix = x > 3 ? "°" : "";
    display.textContent = label + " = " + inputValue + suffix;
    values[x] = inputValue;
}

function solveTriangle() {
    let [a, b, c, alpha, beta, gamma] = values.map(v => parseFloat(v) || "");

    // Determine knowns and unknowns
    let sides = [a, b, c].filter(val => val != "");
    let angles = [alpha, beta, gamma].filter(val => val != "");
    
    if (sides.length == 3) {
        // SSS Case
        [a, b, c, alpha, beta, gamma] = solveSSS(a, b, c, alpha, beta, gamma);
    } else if (sides.length == 2 && angles.length == 1) {
        // SAS Case
        [a, b, c, alpha, beta, gamma] = solveSASorSSA(a, b, c, alpha, beta, gamma);
    } else if (sides.length == 1 && angles.length == 2) {
        // ASA or AAS Case
        [a, b, c, alpha, beta, gamma] = solveASAorAAS(a, b, c, alpha, beta, gamma);
    } else if (angles.length == 3) {
        console.log("No Triangle Possible.")
    }
    
    // Update values array and outputs
    values = [a, b, c, alpha, beta, gamma].map(v => v.toString());
    setOutputs();
}

function solveSSS(a, b, c, alpha, beta, gamma) {
    // SSS Case
    gamma = radiansToDegrees(Math.acos(roundNum(((c * c) - (a * a) - (b * b)) / (-2 * a * b))));
    alpha = radiansToDegrees(Math.asin(roundNum(a * (Math.sin(degreesToRadians(gamma)) / c))));
    beta = (180 - alpha - gamma);
    return [a, b, c, alpha, beta, gamma].map(roundNum);
}

function solveSASorSSA(a, b, c, alpha, beta, gamma) {
    if (alpha) {
        // SAS Case Alpha
        if (!a) {
            a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(degreesToRadians(alpha)));
            beta = radiansToDegrees(Math.asin(roundNum(b * Math.sin(degreesToRadians(alpha)) / a)));
            gamma = 180 - alpha - beta;

        // SSA Case Alpha Side-C
        } else if (!b) {
            if (alpha >= 90) {
                if (a > c) {
                    console.log("One Triangle Possible");
                } else {
                    console.log("No Triangle Possible");
                }
            } else {
                if (a >= c) {
                    console.log("One Triangle Possible");
                } else {
                    gamma = radiansToDegrees(Math.asin(roundNum(c * Math.sin(degreesToRadians(alpha)) / a)));
                    if (Math.sin(degreesToRadians(gamma)) < 1) {
                        console.log("Two Triangles");
                        var gamma2 = 180 - gamma;
                        var beta2 = 180 - alpha - gamma2;
                        var b2 = (a * Math.sin(degreesToRadians(beta2)) / Math.sin(degreesToRadians(alpha)));
                        setSecondOutputs([a,b2,c,alpha,beta2,gamma2].map(roundNum)); 
                    } else if (gamma == 90) {
                        console.log("One Triangle Possible");
                    } else {
                        console.log("No Triangle Possible");
                    }
                }
            }
            gamma = radiansToDegrees(Math.asin(roundNum(c * Math.sin(degreesToRadians(alpha)) / a)));
            beta = 180 - alpha - gamma;
            b = (a * Math.sin(degreesToRadians(beta)) / Math.sin(degreesToRadians(alpha)));

        // SSA Case Alpha Side-B
        } else if (!c) {
            if (alpha >= 90) {
                if (a > b) {
                    console.log("One Triangle Possible");
                } else {
                    console.log("No Triangle Possible");
                }
            } else {
                if (a >= b) {
                    console.log("One Triangle Possible");
                } else {
                    beta = radiansToDegrees(Math.asin(roundNum(b * Math.sin(degreesToRadians(alpha)) / a)));
                    if (Math.sin(degreesToRadians(beta)) < 1) {
                        console.log("Two Triangles");
                        var beta2 = 180 - beta;
                        var gamma2 = 180 - alpha - beta2; 
                        var c2 = (a * Math.sin(degreesToRadians(gamma2)) / Math.sin(degreesToRadians(alpha)));
                        setSecondOutputs([a,b,c2,alpha,beta2,gamma2].map(roundNum)); 
                    } else if (gamma == 90) {
                        console.log("One Triangle Possible");
                    } else {
                        console.log("No Triangle Possible");
                    }
                }
            }
            beta = radiansToDegrees(Math.asin(roundNum(b * Math.sin(degreesToRadians(alpha)) / a)));
            gamma = 180 - alpha - beta;
            c = (a * Math.sin(degreesToRadians(gamma)) / Math.sin(degreesToRadians(alpha)));
        }
    } else if (beta) {
        // SAS Case Beta
        if (!b) {
            b = Math.sqrt(a * a + c * c - 2 * a * c * Math.cos(degreesToRadians(beta)));
            alpha = radiansToDegrees(Math.asin(roundNum(a * Math.sin(degreesToRadians(beta)) / b)));
            gamma = 180 - alpha - beta;

        // SSA Case Beta Side-C
        } else if (!a) {
            if (beta >= 90) {
                if (b > c) {
                    console.log("One Triangle Possible");
                } else {
                    console.log("No Triangle Possible");
                }
            } else {
                if (b >= c) {
                    console.log("One Triangle Possible");
                } else {
                    gamma = radiansToDegrees(Math.asin(roundNum(c * Math.sin(degreesToRadians(beta)) / b)));
                    if (Math.sin(degreesToRadians(gamma)) <= 1) {
                        console.log("Two Triangles");
                        var gamma2 = 180 - gamma;
                        var alpha2 = 180 - beta - gamma2; 
                        var a2 = (b * Math.sin(degreesToRadians(alpha2)) / Math.sin(degreesToRadians(beta)));
                        setSecondOutputs([a2,b,c,alpha2,beta,gamma2].map(roundNum));  
                    } else if (gamma == 90) {
                        console.log("One Triangle Possible");
                    } else {
                        console.log("No Triangle Possible");
                    }
                }
            }
            gamma = radiansToDegrees(Math.asin(roundNum(c * Math.sin(degreesToRadians(beta)) / b)));
            alpha = 180 - beta - gamma;
            a = (b * Math.sin(degreesToRadians(alpha)) / Math.sin(degreesToRadians(beta)));

        // SSA Case Beta Side-A
        } else if (!c) {
            if (beta >= 90) {
                if (b > a) {
                    console.log("One Triangle Possible");
                } else {
                    console.log("No Triangle Possible");
                }
            } else {
                if (b >= a) {
                    console.log("One Triangle Possible");
                } else {
                    alpha = radiansToDegrees(Math.asin(roundNum(a * Math.sin(degreesToRadians(beta)) / b)));
                    if (Math.sin(degreesToRadians(alpha)) < 1) {
                        console.log("Two Triangles");
                        var alpha2 = 180 - alpha;
                        var gamma2 = 180 - beta - alpha2; 
                        var c2 = (b * Math.sin(degreesToRadians(gamma2)) / Math.sin(degreesToRadians(beta)));
                        setSecondOutputs([a,b,c2,alpha2,beta,gamma2].map(roundNum));  
                    } else if (gamma == 90) {
                        console.log("One Triangle Possible");
                    } else {
                        console.log("No Triangle Possible");
                    }
                }
            }
            alpha = radiansToDegrees(Math.asin(roundNum(a * Math.sin(degreesToRadians(beta)) / b)));
            gamma = 180 - alpha - beta;
            c = (b * Math.sin(degreesToRadians(gamma)) / Math.sin(degreesToRadians(beta)));
        }
    } else if (gamma) {
        // SAS Case Gamma
        if (!c) {
            c = Math.sqrt(a * a + b * b - 2 * b * c * Math.cos(degreesToRadians(gamma)));
            alpha = radiansToDegrees(Math.asin(roundNum(a * Math.sin(degreesToRadians(gamma)) / c)));
            beta = 180 - alpha - gamma;

        // SSA Case Gamma Side-B
        } else if (!a) {
            if (gamma >= 90) {
                if (c > b) {
                    console.log("One Triangle Possible");
                } else {
                    console.log("No Triangle Possible");
                }
            } else {
                if (c >= b) {
                    console.log("One Triangle Possible");
                } else {
                    beta = radiansToDegrees(Math.asin(roundNum(b * Math.sin(degreesToRadians(gamma)) / c)));
                    if (Math.sin(degreesToRadians(beta)) < 1) {
                        console.log("Two Triangles");
                        var beta2 = 180 - beta;
                        var alpha2 = 180 - beta2 - gamma; 
                        var a2 = (c * Math.sin(degreesToRadians(alpha2)) / Math.sin(degreesToRadians(gamma)));
                        setSecondOutputs([a2,b,c,alpha2,beta2,gamma].map(roundNum));  
                    } else if (gamma == 90) {
                        console.log("One Triangle Possible");
                    } else {
                        console.log("No Triangle Possible");
                    }
                }
            }
            beta = radiansToDegrees(Math.asin(roundNum(b * Math.sin(degreesToRadians(gamma)) / c)));
            alpha = 180 - beta - gamma;
            a = (c * Math.sin(degreesToRadians(alpha)) / Math.sin(degreesToRadians(gamma)));

        // SSA Case Gamma Side-A
        } else if (!b) {
            if (gamma >= 90) {
                if (c > a) {
                    console.log("One Triangle Possible");
                } else {
                    console.log("No Triangle Possible");
                }
            } else {
                if (c >= a) {
                    console.log("One Triangle Possible");
                } else {
                    alpha = radiansToDegrees(Math.asin(roundNum(a * Math.sin(degreesToRadians(gamma)) / c)));
                    if (Math.sin(degreesToRadians(alpha)) < 1) {
                        console.log("Two Triangles");
                        var alpha2 = 180 - alpha;
                        var beta2 = 180 - alpha2 - gamma; 
                        var b2 = (c * Math.sin(degreesToRadians(beta2)) / Math.sin(degreesToRadians(gamma)));
                        setSecondOutputs([a,b2,c,alpha2,beta2,gamma].map(roundNum));  
                    } else if (gamma == 90) {
                        console.log("One Triangle Possible");
                    } else {
                        console.log("No Triangle Possible");
                    }
                }
            }
            alpha = radiansToDegrees(Math.asin(roundNum(a * Math.sin(degreesToRadians(gamma)) / c)));
            beta = 180 - alpha - gamma;
            b = (c * Math.sin(degreesToRadians(beta)) / Math.sin(degreesToRadians(gamma)));
        }
    }
    return [a, b, c, alpha, beta, gamma].map(roundNum);
}

function solveASAorAAS(a, b, c, alpha, beta, gamma) {
        if (a) {
            if (!gamma) {
                gamma = 180 - alpha - beta;
            } else if (!beta) {
                beta = 180 - alpha - gamma;
            } else {
                alpha = 180 - beta - gamma;
            }
            b = (a * Math.sin(degreesToRadians(beta)) / Math.sin(degreesToRadians(alpha)));
            c = (a * Math.sin(degreesToRadians(gamma)) / Math.sin(degreesToRadians(alpha)));
        } else if (b) {
            if (!gamma) {
                gamma = 180 - alpha - beta;
            } else if (!alpha) {
                alpha = 180 - beta - gamma;
            } else {
                beta = 180 - alpha - gamma;
            }
            a = (b * Math.sin(degreesToRadians(alpha)) / Math.sin(degreesToRadians(beta)));
            c = (b * Math.sin(degreesToRadians(gamma)) / Math.sin(degreesToRadians(beta)));
        } else if (c) {
            if (!alpha) {
                alpha = 180 - beta - gamma;
            } else if (!beta) {
                beta = 180 - alpha - gamma;
            } else {
                gamma = 180 - alpha - beta;
            }
            a = (c * Math.sin(degreesToRadians(alpha)) / Math.sin(degreesToRadians(gamma)));
            b = (c * Math.sin(degreesToRadians(beta)) / Math.sin(degreesToRadians(gamma)));
        }
        return [a, b, c, alpha, beta, gamma].map(roundNum);
}

function degreesToRadians(angle) {
    return angle * Math.PI / 180;
}

function radiansToDegrees(angle) {
    return angle * 180 / Math.PI;
}

function roundNum(num) {
    return Math.round(num * 100) / 100;
}

function setOutputs() {
    const labels = ["a", "b", "c", "α", "β", "γ"];
    values.forEach((val, index) => {
        const output = document.getElementById('p'+index);
        const suffix = index > 2 ? "°" : "";
        output.textContent = labels[index] + " = " + val + suffix;
    });
}

function setSecondOutputs(list) {
    document.getElementById('secondTriangleOutput').style.visibility = 'visible';
    document.getElementById('secondTriangleTitle').style.visibility = 'visible';
    const labels = ["a₂", "b₂", "c₂", "α₂", "β₂", "γ₂"];
    list.forEach((val, index) => {
        const output = document.getElementById('hp'+index);
        const suffix = index > 2 ? "°" : "";
        output.textContent = labels[index] + " = " + val + suffix;
    });
}

function clearAll() {
    // Clear all input fields
    const inputs = document.querySelectorAll("input");
        for (const input of inputs) {
            input.value = "";
        }

    // Reset all output fields
    const outputParagraphs = document.querySelectorAll('.paragraphs-container .paragraphs');
    const labels = ["a", "b", "c", "α", "β", "γ"];
    outputParagraphs.forEach((p, index) => {
        p.textContent = labels[index] + ' = ';
    });
    const hiddenOutputParagraphs = document.querySelectorAll('.hidden-paragraphs-container .hiddenParagraphs');
    const hiddenlabels = ["a₂", "b₂", "c₂", "α₂", "β₂", "γ₂"];
    hiddenOutputParagraphs.forEach((p, index) => {
        p.textContent = hiddenlabels[index] + ' = ';
    });

    // Hides Second Triangle Outputs
    document.getElementById('secondTriangleTitle').style.visibility = 'hidden';
    document.getElementById('secondTriangleOutput').style.visibility = 'hidden';
}