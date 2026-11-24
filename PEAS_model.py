#Define PEAS models for different agents
peas_models = { 
"ATM": {
 "Performance Measure": [
 "Accurate transactions",
 "Secure operations",
 "Minimum transaction time"
 ],
 "Environment": [
 "Banks",
 "ATM centres",
 "Banking network"
 ],
 "Actuators": [
 "Cash dispenser",
 "Display screen",
 "Receipt printer",
 "Card ejector"
 ],
 "Sensors": [
 "Card reader",
 "Keypad",
 "Fingerprint scanner",
 "Cash detection sensor"
 ]
 },
# Function to display the PEAS model
def display_peas(agent):
    print("\n======================================")
    print("PEAS MODEL:", agent.upper())
    print("======================================")
    for component, details in peas_models[agent].items():
        print("\n" + component + ":")
        for item in details:
            print("-", item)
# Display available agents
print("REAL-LIFE INTELLIGENT AGENTS")
print("2. ATM")
agents = ["ATM"]
if 1 <= choice <= 2:
    selected_agent = agents[choice - 1]
    display_peas(selected_agent)
