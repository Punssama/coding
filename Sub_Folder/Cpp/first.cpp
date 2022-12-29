#include <bits/stdc++.h>

using namespace std;

int n, target;
vector<int> nums;
unordered_map<int, int>m;
vector<int> result;

int main()
{
  freopen("t_s.INP", "r", stdin);
  freopen("t_s.OUT", "w", stdout);
   
  cin >> n >> target;
  for (int i = 0; i<n;i++){
    int x;
    cin >> x;
    nums.push_back(x);
  }

  for (int i = 0; i < n; i++){
    int tmp = target - nums[i];
    if (m.find(tmp) != m.end()){
      result.push_back(m[tmp]);
      result.push_back(i);
      break;
    }else {
      m.insert({nums[i], i});

    }
  }
  for (auto i:result){
    cout << i << " ";
  }
  return 0;
}
